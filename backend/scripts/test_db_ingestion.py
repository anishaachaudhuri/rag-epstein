from app.db.session import SessionLocal

from app.ingestion.hf_loader import (
    stream_documents
)

from app.metadata.document_classifier import (
    classify_document
)

from app.chunking.chunk_service import (
    chunk_document
)

from app.services.ingestion_service import (
    ingest_document
)


db = SessionLocal()

doc = next(stream_documents())

doc_type = classify_document(
    doc["filename"],
    doc["text"]
)

chunks = chunk_document(
    doc["text"],
    doc_type
)

doc_id = ingest_document(
    db=db,
    filename=doc["filename"],
    document_type=doc_type,
    raw_text=doc["text"],
    chunks=chunks
)

print(
    f"Inserted document {doc_id}"
)

db.close()