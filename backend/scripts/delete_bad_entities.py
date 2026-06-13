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
    "September"

    "MR"
    "n't"
    "decades"
    "monthly"
    "March"
    "AI"
    "AGI"
    "iPad"
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