BAD_DATES = {
    "a month",
    "three months",
    "13 days",
    "the next two years",
    "today",
    "tomorrow",
    "this week",
    "last week",
    "last year",
    "many years",
    "the years",
    "years",
    "daily",
    "annual",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday"
}

BAD_ENTITIES = {
    "MR",
    "n't",
    "decades",
    "monthly",
    "AI",
    "AGI",
    "iPad",
    "HOUSE",
    "House",
    "LLC",
    "Board",
    "Court",
    "State",
    "the year",
    "n't",
    "n’t",
    "recent years",
    "May",
    "Jane",
    "Jeff",
    "the day",
    "jeffrey E.\""
}

NORMALIZATION_MAP = {
    "U.S.": "United States",
    "US": "United States",
    "America": "United States",
    "the United States": "United States",

    "Trump": "Donald Trump",

    "Epstein": "Jeffrey Epstein",
    "Jeffrey": "Jeffrey Epstein",
    "jeffrey E.": "Jeffrey Epstein",
    "jeffrey E. <": "Jeffrey Epstein",
    "JEE": "Jeffrey Epstein",

    "Clinton": "Bill Clinton",

    "the White House": "White House",

    "NY": "New York",
    "New York City": "New York",

    "Dershowitz": "Alan Dershowitz",
    "Maxwell": "Ghislaine Maxwell",

    "Obama": "Barack Obama",

    "Snowden": "Edward Snowden",

    "Andrew": "Prince Andrew",

    "Roberts": "Virginia Roberts",

    "UK": "United Kingdom",

    "USA": "United States",
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

        if text in NORMALIZATION_MAP:
            text = NORMALIZATION_MAP[text]

        if text.lower() in BAD_DATES:
            continue

        if text in BAD_ENTITIES:
            continue

        if text.isdigit():
            continue

        if len(text) < 2:
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