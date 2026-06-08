from app.ingestion.hf_loader import (
    stream_documents
)

from app.metadata.document_classifier import (
    classify_document
)

from app.chunking.chunk_service import (
    chunk_document
)

from app.metadata.entity_extractor import (
    extract_entities
)


doc = next(stream_documents())

doc_type = classify_document(
    doc["filename"],
    doc["text"]
)

chunks = chunk_document(
    doc["text"],
    doc_type
)

print(
    f"\nDOCUMENT CHUNKS: {len(chunks)}"
)

for idx, chunk in enumerate(chunks):

    entities = extract_entities(
        chunk
    )

    print("\n")
    print("=" * 50)
    print(f"CHUNK {idx}")
    print("=" * 50)

    print(
        f"Entities Found: {len(entities)}"
    )

    for entity in entities[:15]:
        print(entity)

    if idx == 2:
        break