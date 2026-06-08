from app.chunking.email_chunker import (
    chunk_email
)

from app.chunking.report_chunker import (
    chunk_report
)

from app.chunking.ocr_chunker import (
    chunk_ocr
)


def chunk_document(
    text: str,
    document_type: str
):

    if document_type == "EMAIL":
        return chunk_email(text)

    word_count = len(
        text.split()
    )

    if word_count < 600:
        return [text]

    if word_count < 1500:

        if document_type == "OCR_REPORT":
            return chunk_ocr(
                text,
                target_words=400
            )

        return chunk_report(
            text,
            target_words=400
        )

    if document_type == "OCR_REPORT":

        return chunk_ocr(
            text,
            target_words=500
        )

    return chunk_report(
        text,
        target_words=500
    )