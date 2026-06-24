import ast
import numpy as np


def cosine_similarity(
    a,
    b
):

    if isinstance(a, str):
        a = ast.literal_eval(a)

    if isinstance(b, str):
        b = ast.literal_eval(b)

    a = np.array(
        a,
        dtype=float
    )

    b = np.array(
        b,
        dtype=float
    )

    return float(
        np.dot(a, b)
    )


def mmr_rerank(
    candidates,
    limit=10,
    lambda_param=0.8
):
    if not candidates:
        return []

    selected = [
        candidates[0]
    ]

    remaining = (
        candidates[1:]
    )

    while (
        remaining
        and
        len(selected) < limit
    ):

        best_score = float("-inf")
        best_doc = None

        for candidate in remaining:

            relevance = (
                candidate["score"]
            )

            max_similarity = 0

            for chosen in selected:

                similarity = (
                    cosine_similarity(
                        candidate[
                            "embedding"
                        ],
                        chosen[
                            "embedding"
                        ]
                    )
                )

                max_similarity = max(
                    max_similarity,
                    similarity
                )

            mmr_score = (
                lambda_param
                * relevance
                -
                (1 - lambda_param)
                * max_similarity
            )

            if mmr_score > best_score:

                best_score = (
                    mmr_score
                )

                best_doc = (
                    candidate
                )

        selected.append(
            best_doc
        )

        remaining.remove(
            best_doc
        )

    return selected