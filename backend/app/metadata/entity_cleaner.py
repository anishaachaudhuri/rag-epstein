BAD_DATES = {
    "a month",
    "three months",
    "13 days",
    "the next two years"
}


def clean_entities(entities):

    cleaned = []

    seen = set()

    for entity in entities:

        text = (
            entity["text"]
            .replace("\n", " ")
            .strip()
        )

        label = entity["label"]

        if label == "DATE" and text.lower() in BAD_DATES:
            continue

        key = (text, label)

        if key in seen:
            continue

        seen.add(key)

        cleaned.append(
            {
                "text": text,
                "label": label
            }
        )

    return cleaned