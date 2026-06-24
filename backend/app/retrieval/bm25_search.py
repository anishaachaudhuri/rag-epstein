from sqlalchemy import text


def bm25_search(
    db,
    query,
    limit=10
):

    sql = text("""
        SELECT
            c.id,
            c.chunk_id,
            c.chunk_index,
            c.text,
            c.embedding,

            d.filename,
            d.document_type,

            ts_rank(
                to_tsvector(
                    'english',
                    c.text
                ),
                plainto_tsquery(
                    'english',
                    :query
                )
            ) AS score

        FROM chunks c

        JOIN documents d
        ON c.document_id = d.id

        WHERE
            to_tsvector(
                'english',
                c.text
            )
            @@
            plainto_tsquery(
                'english',
                :query
            )

        ORDER BY score DESC

        LIMIT :limit
    """)

    result = db.execute(
        sql,
        {
            "query": query,
            "limit": limit
        }
    )

    return result.fetchall()