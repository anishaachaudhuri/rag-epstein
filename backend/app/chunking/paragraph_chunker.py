import re


def paragraph_chunker(
    text: str,
    target_words: int = 500,
    overlap_paragraphs: int = 1
):
    paragraphs = [
        p.strip()
        for p in re.split(r"\n\s*\n", text)
        if p.strip()
    ]

    chunks = []

    current_chunk = []
    current_words = 0

    for paragraph in paragraphs:

        paragraph_words = len(
            paragraph.split()
        )

        if (
            current_words + paragraph_words
            > target_words
            and current_chunk
        ):

            chunks.append(
                "\n\n".join(current_chunk)
            )

            overlap = (
                current_chunk[-overlap_paragraphs:]
                if overlap_paragraphs > 0
                else []
            )

            current_chunk = overlap.copy()

            current_words = sum(
                len(p.split())
                for p in current_chunk
            )

        current_chunk.append(paragraph)

        current_words += paragraph_words

    if current_chunk:
        chunks.append(
            "\n\n".join(current_chunk)
        )

    return chunks