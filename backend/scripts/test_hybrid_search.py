from app.db.session import SessionLocal

from app.retrieval.hybrid_search import (
    hybrid_search
)

db = SessionLocal()

results = hybrid_search(
    db,
    query="Snowden Moscow planning",
    limit=10
)

for result in results:

    print("\n")
    print("=" * 70)

    print(
        result["filename"]
    )

    print(
        f"Score: {result['score']:.4f}"
    )

    print(
        result["text"][:500]
    )

db.close()