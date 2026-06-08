import spacy

nlp = spacy.load(
    "en_core_web_sm"
)

ALLOWED_LABELS = {
    "PERSON",
    "ORG",
    "GPE",
    "DATE"
}


def extract_entities(text: str):

    doc = nlp(text)

    entities = []

    seen = set()

    for ent in doc.ents:

        if ent.label_ not in ALLOWED_LABELS:
            continue

        key = (
            ent.text.strip(),
            ent.label_
        )

        if key in seen:
            continue

        seen.add(key)

        entities.append(
            {
                "text": ent.text.strip(),
                "label": ent.label_
            }
        )

    return entities