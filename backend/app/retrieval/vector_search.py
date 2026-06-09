from sqlalchemy import text

from app.embeddings.embedder import (
    generate_embedding
)

def vector_search(
    db,
    query,
    limit=10
):
    query_embedding = generate_embedding(
        query
    )

    sql = text("""
    SELECT
        c.id,
        c.chunk_id,
        c.chunk_index,
        c.text,

        d.filename,
        d.document_type,

        c.embedding <=> CAST(:embedding AS vector)
        AS distance

    FROM chunks c

    JOIN documents d
    ON c.document_id = d.id

    ORDER BY c.embedding <=> CAST(:embedding AS vector)

    LIMIT :limit
    """)

    results = db.execute(
        sql,
        {
            "embedding": str(query_embedding),
            "limit": limit
        }
    )

    return results.fetchall()