from sqlalchemy import update

from app.db.session import SessionLocal
from app.models.entity import Entity


NORMALIZATION_MAP = {

    "U.S.": "United States",
    "US": "United States",
    "USA": "United States",
    "America": "United States",
    "the United States": "United States",

    "UK": "United Kingdom",
    "Britain": "United Kingdom",
    "England": "United Kingdom",

    "Trump": "Donald Trump",

    "Epstein": "Jeffrey Epstein",
    "Jeffrey": "Jeffrey Epstein",
    "jeffrey E.": "Jeffrey Epstein",
    "jeffrey E. <": "Jeffrey Epstein",
    "JEE": "Jeffrey Epstein",
    'jeffrey E."': "Jeffrey Epstein",

    "Clinton": "Bill Clinton",
    "Bill": "Bill Clinton",

    "Hillary": "Hillary Clinton",

    "Greenwald": "Glenn Greenwald",
    "Poitras": "Laura Poitras",
    "al Qaeda": "al-Qaeda",

    "Obama": "Barack Obama",
    "Barak Obama": "Barack Obama",

    "Snowden": "Edward Snowden",

    "Putin": "Vladimir Putin",

    "Maxwell": "Ghislaine Maxwell",

    "Dershowitz": "Alan Dershowitz",

    "Bibi": "Benjamin Netanyahu",

    "Andrew": "Prince Andrew",

    "Roberts": "Virginia Roberts",
    "Virginia": "Virginia Roberts",

    "the White House": "White House",

    "NY": "New York",
    "New York City": "New York",
    "new york": "New York",

    "Angela Merkel's": "Angela Merkel",

    "Bannon": "Steve Bannon",

    "Thomas Jr.": "Landon Thomas",
    "landon jr thomas": "Landon Thomas",
    "Lando": "Landon Thomas",

    "Michael": "Michael Wolff",

    "Bush": "George W. Bush",

    "Acosta": "Alexander Acosta",

    "the New York Times": "New York Times",

    "Ghislaine": "Ghislaine Maxwell"
}


db = SessionLocal()

try:

    total_updates = 0

    for old_name, new_name in NORMALIZATION_MAP.items():

        result = db.execute(
            update(Entity)
            .where(
                Entity.entity_text == old_name
            )
            .values(
                entity_text=new_name
            )
        )

        count = result.rowcount

        total_updates += count

        print(
            f"{old_name} -> {new_name}: "
            f"{count} rows updated"
        )

    db.commit()

    print(
        f"\nTotal rows updated: "
        f"{total_updates}"
    )

finally:
    db.close()