from fastapi import APIRouter

from app.db.session import SessionLocal

from app.models.entity import Entity
from app.models.chunk import Chunk
from app.models.document import Document

router = APIRouter(
    prefix="/entity",
    tags=["entity"]
)


@router.get("/{name}")
def get_entity_details(
    name: str
):
    db = SessionLocal()

    entities = (
        db.query(Entity)
        .filter(
            Entity.entity_text == name
        )
        .all()
    )

    if not entities:
        db.close()

        return {
            "error": "Entity not found"
        }

    mention_count = len(entities)

    chunk_ids = [
        entity.chunk_id
        for entity in entities
    ]

    documents = (
        db.query(Document.filename)
        .join(
            Chunk,
            Chunk.document_id == Document.id
        )
        .filter(
            Chunk.id.in_(chunk_ids)
        )
        .distinct()
        .all()
    )

    related_entities = (
        db.query(Entity.entity_text)
        .filter(
            Entity.chunk_id.in_(chunk_ids)
        )
        .filter(
            Entity.entity_text != name
        )
        .distinct()
        .limit(20)
        .all()
    )

    db.close()

    return {
        "name": name,
        "mentions": mention_count,
        "documents": [
            d[0]
            for d in documents
        ],
        "related_entities": [
            e[0]
            for e in related_entities
        ]
    }