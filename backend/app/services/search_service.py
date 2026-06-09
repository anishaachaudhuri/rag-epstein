from app.retrieval.hybrid_search import (
    hybrid_search
)

def search_documents(
    db,
    query,
    limit=10
):
    results = hybrid_search(
        db,
        query,
        limit
    )

    formatted = []

    for result in results:

        formatted.append(
            {
                "filename": result["filename"],
                "chunk_id": result["chunk_id"],
                "chunk_index": result["chunk_index"],
                "text": result["text"],
                "score": round(
                    result["score"],
                    4
                )
            }
        )

    return {
        "query": query,
        "count": len(formatted),
        "results": formatted
    }