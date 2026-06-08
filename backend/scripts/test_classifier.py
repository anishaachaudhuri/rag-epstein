from app.ingestion.hf_loader import stream_documents

from app.metadata.document_classifier import (
    classify_document
)

for i, doc in enumerate(stream_documents()):

    doc_type = classify_document(
        doc["filename"],
        doc["text"]
    )

    print("\nFILE:")
    print(doc["filename"])

    print("TYPE:")
    print(doc_type)

    print("-" * 50)

    if i == 20:
        break