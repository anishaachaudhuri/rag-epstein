from collections import defaultdict

from app.retrieval.vector_search import (
    vector_search
)
from app.retrieval.bm25_search import (
    bm25_search
)
from app.retrieval.mmr import (
    mmr_rerank
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

    candidates = []

    for chunk_id, score in ranked[:20]:

        row = result_map[
            chunk_id
        ]

        candidates.append(
            {
                "chunk_id":
                row.chunk_id,

                "filename":
                row.filename,

                "chunk_index":
                row.chunk_index,

                "text":
                row.text,

                "embedding":
                row.embedding,

                "score":
                score
            }
        )

    print(type(candidates[0]["embedding"]))
    print(candidates[0]["embedding"][:100])

    final_results = mmr_rerank(
        candidates,
        limit=limit,
        lambda_param=0.8
    )

    for result in final_results:

        result.pop(
            "embedding",
            None
        )

    return final_results