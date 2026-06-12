from app.metadata.entity_cleaner import clean_entities

entities = [
    {"text": "U.S.", "label": "GPE"},
    {"text": "US", "label": "GPE"},
    {"text": "America", "label": "GPE"},
    {"text": "Trump", "label": "PERSON"},
    {"text": "Epstein", "label": "PERSON"},
    {"text": "today", "label": "DATE"},
    {"text": "1060865", "label": "DATE"},
]

print(clean_entities(entities))