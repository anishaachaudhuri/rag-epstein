from app.ingestion.hf_loader import (
    stream_documents
)

from app.metadata.document_classifier import (
    classify_document
)

from app.chunking.chunk_service import (
    chunk_document
)


for doc in stream_documents():

    doc_type = classify_document(
        doc["filename"],
        doc["text"]
    )

    chunks = chunk_document(
        doc["text"],
        doc_type
    )

    print("\nFILE:")
    print(doc["filename"])

    print("TYPE:")
    print(doc_type)

    print("WORD COUNT:")
    print(len(doc["text"].split()))

    print("CHUNKS:")
    print(len(chunks))

    print("-" * 50)

    if doc_type == "EMAIL":
        break