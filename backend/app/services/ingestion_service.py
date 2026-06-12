import uuid

from app.models.document import Document
from app.models.chunk import Chunk
from app.models.entity import Entity
from sqlalchemy import select
from app.embeddings.embedder import (
    generate_embedding
)

from app.metadata.entity_extractor import (
    extract_entities
)

from app.metadata.entity_cleaner import clean_entities

def ingest_document(
    db,
    filename,
    document_type,
    raw_text,
    chunks
):
    existing = db.execute(
        select(Document).where(
            Document.filename == filename
        )
    ).scalar_one_or_none()

    if existing:
        return existing.id
    
    document = Document(
        filename=filename,
        document_type=document_type,
        raw_text=raw_text
    )

    db.add(document)
    db.flush()

    for idx, chunk_text in enumerate(chunks):

        embedding = generate_embedding(
            chunk_text
        )

        chunk = Chunk(
            document_id=document.id,
            chunk_index=idx,
            chunk_id=str(uuid.uuid4()),
            text=chunk_text,
            embedding=embedding
        )

        db.add(chunk)
        db.flush()

        entities = extract_entities(
            chunk_text
        )
        entities = clean_entities(
            entities
        )

        for entity in entities:

            entity_row = Entity(
                chunk_id=chunk.id,
                entity_text=entity["text"],
                entity_label=entity["label"]
            )

            db.add(entity_row)

    db.commit()

    return document.id