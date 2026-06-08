from app.ingestion.hf_loader import (
    stream_documents
)

for i, doc in enumerate(stream_documents()):

    print("\nFILE:", doc["filename"])
    print(doc["text"][:300])

    if i == 2:
        break