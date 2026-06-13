from sqlalchemy import update

from app.db.session import SessionLocal
from app.models.entity import Entity

NORMALIZATION_MAP = {
    "U.S.": "United States",
    "US": "United States",
    "America": "United States",
    "the United States": "United States",
    "USA": "United States",
    "Trump": "Donald Trump",

    "Epstein": "Jeffrey Epstein",
    "Jeffrey": "Jeffrey Epstein",
    "jeffrey E.": "Jeffrey Epstein",
    "jeffrey E. <": "Jeffrey Epstein",
    "JEE": "Jeffrey Epstein",
    "Roberts": "Virginia Roberts",
    "Clinton": "Bill Clinton",
    "Hillary": "Hillary Clinton",
    "Andrew": "Andrew Prince",
    "the White House": "White House",

    "NY": "New York",
    "New York City": "New York",

    "Dershowitz": "Alan Dershowitz",
    "Maxwell": "Ghislaine Maxwell",

    "Obama": "Barack Obama",

    "Britain": "UK",
    "England": "UK",

    "Snowden": "Edward Snowden",

    "Putin": "Vladimir Putin",

    "Bill": "Bill Clinton"
}

db = SessionLocal()

try:

    for old_name, new_name in NORMALIZATION_MAP.items():

        result = db.execute(
            update(Entity)
            .where(Entity.entity_text == old_name)
            .values(entity_text=new_name)
        )

        print(
            f"{old_name} -> {new_name} : "
            f"{result.rowcount} rows updated"
        )

    db.commit()

finally:
    db.close()