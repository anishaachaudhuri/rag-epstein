from app.ingestion.hf_loader import (
    stream_documents
)

from app.metadata.entity_extractor import (
    extract_entities
)


doc = next(stream_documents())

entities = extract_entities(
    doc["text"][:5000]
)

print("\nFILE:")
print(doc["filename"])

print("\nENTITIES\n")

for entity in entities[:30]:
    print(entity)