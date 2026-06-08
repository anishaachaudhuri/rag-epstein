from app.chunking.paragraph_chunker import (
    paragraph_chunker
)

def chunk_report(
    text: str,
    target_words: int = 500
):
    return paragraph_chunker(
        text=text,
        target_words=target_words,
        overlap_paragraphs=1
    )