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


MAX_DOCS = 100


def run():

    db = SessionLocal()

    processed = 0

    try:

        for doc in stream_documents():

            doc_type = classify_document(
                doc["filename"],
                doc["text"]
            )

            chunks = chunk_document(
                doc["text"],
                doc_type
            )

            ingest_document(
                db=db,
                filename=doc["filename"],
                document_type=doc_type,
                raw_text=doc["text"],
                chunks=chunks
            )

            processed += 1

            print(
                f"[{processed}] {doc['filename']}"
            )

            if processed >= MAX_DOCS:
                break

    finally:
        db.close()


if __name__ == "__main__":
    run()