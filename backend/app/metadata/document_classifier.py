def classify_document(
    filename: str,
    text: str
):

    filename = filename.upper()

    if filename.startswith("TEXT-"):

        if (
            "From:" in text
            or "To:" in text
            or "Sent:" in text
        ):
            return "EMAIL"

        return "REPORT"

    if filename.startswith("IMAGES-"):
        return "OCR_REPORT"

    return "UNKNOWN"