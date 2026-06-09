from app.db.session import SessionLocal

from app.retrieval.bm25_search import (
    bm25_search
)

db = SessionLocal()

results = bm25_search(
    db,
    "Snowden Moscow planning",
    limit=5
)

for row in results:

    print("\n")
    print("=" * 70)

    print(row.filename)

    print(
        f"Score: {row.score}"
    )

    print(
        row.text[:500]
    )

db.close()