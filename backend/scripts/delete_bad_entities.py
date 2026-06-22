from sqlalchemy import delete

from app.db.session import SessionLocal
from app.models.entity import Entity

BAD_ENTITIES = {
    "HOUSE",
    "House",

    "Board",
    "State",
    "Court",
    "LLC",

    "today",
    "yesterday",

    "this year",
    "a year",
    "two years",

    "months",
    "weeks",

    "the day",
    "the year",

    "September",
    "March",

    "MR",
    "n't",
    "n’t",

    "decades",
    "monthly",

    "AI",
    "AGI",

    "iPad",
    "Jeff",
    "Jane",
    "recent years",
    "the day",
    "me",
    "jeffrey E.\"",
    "P.C.",
    "this year",
    "one day",
    "Honor"
}

db = SessionLocal()

try:

    result = db.execute(
        delete(Entity).where(
            Entity.entity_text.in_(BAD_ENTITIES)
        )
    )

    print(
        f"Deleted {result.rowcount} rows"
    )

    db.commit()

finally:
    db.close()