from app.embeddings.embedder import (
    generate_embedding
)

sample_text = """
Snowden traveled to Moscow after
leaving Hong Kong in 2013.
"""

vector = generate_embedding(
    sample_text
)

print(
    f"Embedding Dimension: {len(vector)}"
)

print(
    f"First 10 Values: {vector[:10]}"
)