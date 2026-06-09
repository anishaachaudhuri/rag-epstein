from collections import defaultdict

from app.retrieval.vector_search import (
    vector_search
)

from app.retrieval.bm25_search import (
    bm25_search
)


def hybrid_search(
    db,
    query,
    limit=10
):
    vector_results = vector_search(
        db,
        query,
        limit=20
    )

    bm25_results = bm25_search(
        db,
        query,
        limit=20
    )

    scores = defaultdict(float)
    result_map = {}

    # Reciprocal Rank Fusion
    for rank, row in enumerate(vector_results):

        scores[row.id] += (
            1 / (60 + rank)
        )

        result_map[row.id] = row

    for rank, row in enumerate(bm25_results):

        scores[row.id] += (
            1 / (60 + rank)
        )

        result_map[row.id] = row

    ranked = sorted(
        scores.items(),
        key=lambda x: x[1],
        reverse=True
    )

    final_results = []

    for chunk_id, score in ranked[:limit]:

        row = result_map[chunk_id]

        final_results.append(
            {
                "chunk_id": row.chunk_id,
                "filename": row.filename,
                "chunk_index": row.chunk_index,
                "text": row.text,
                "score": score
            }
        )

    return final_results