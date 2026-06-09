from app.db.session import SessionLocal

from app.retrieval.vector_search import (
    vector_search
)

db = SessionLocal()

results = vector_search(
    db,
    query="Snowden Moscow planning",
    limit=5
)

for row in results:

    print("\n")
    print("=" * 70)

    print("FILE:")
    print(row.filename)

    print("\nCHUNK:")
    print(row.chunk_index)

    print("\nDISTANCE:")
    print(round(row.distance, 4))

    print("\nTEXT:")
    print(row.text[:500])

db.close()