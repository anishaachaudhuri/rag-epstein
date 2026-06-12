from fastapi import APIRouter
from sqlalchemy import select, func
from app.db.session import SessionLocal
from app.models.document import Document
from app.models.chunk import Chunk
from app.models.entity import Entity

router = APIRouter(
    prefix="/documents",
    tags=["documents"]
)

@router.get("/")
def get_documents():
    db = SessionLocal()
    try:
        documents = db.execute(
            select(Document)
        ).scalars().all()
        return [
            {
                "id": doc.id,
                "filename": doc.filename,
                "document_type": doc.document_type
            }
            for doc in documents
        ]
    finally:
        db.close()

@router.get("/{document_id}")
def get_document(document_id: int):
    db = SessionLocal()
    try:
        document = db.get(
            Document,
            document_id
        )
        if not document:
            return {
                "error": "Document not found"
            }
        return {
            "id": document.id,
            "filename": document.filename,
            "document_type": document.document_type,
            "raw_text": document.raw_text
        }
    finally:
        db.close()

@router.get("/filename/{filename}")
def get_document_by_filename(
    filename: str
):
    db = SessionLocal()

    try:

        document = db.execute(
            select(Document).where(
                Document.filename == filename
            )
        ).scalar_one_or_none()

        if not document:
            return {
                "error": "Document not found"
            }

        return {
            "id": document.id,
            "filename": document.filename,
            "document_type": document.document_type,
            "raw_text": document.raw_text
        }

    finally:
        db.close()

@router.get("/{document_id}/intelligence")
def get_document_intelligence(
    document_id: int
):
    db = SessionLocal()
    document = (
        db.query(Document)
        .filter(Document.id == document_id)
        .first()
    )

    if not document:
        db.close()
        return {
            "error": "Document not found"
        }

    chunk_count = (
        db.query(Chunk)
        .filter(
            Chunk.document_id == document.id
        )
        .count()
    )
    entity_count = (
        db.query(Entity)
        .join(
            Chunk,
            Entity.chunk_id == Chunk.id
        )
        .filter(
            Chunk.document_id == document.id
        )
        .count()
    )
    top_entities = (
        db.query(
            Entity.entity_text,
            func.count(Entity.id)
        )
        .join(
            Chunk,
            Entity.chunk_id == Chunk.id
        )
        .filter(
            Chunk.document_id == document.id
        )
        .group_by(
            Entity.entity_text
        )
        .order_by(
            func.count(Entity.id).desc()
        )
        .limit(10)
        .all()
    )
    db.close()
    return {
        "filename": document.filename,
        "document_type": document.document_type,
        "chunk_count": chunk_count,
        "entity_count": entity_count,
        "top_entities": [
            entity[0]
            for entity in top_entities
        ]
    }