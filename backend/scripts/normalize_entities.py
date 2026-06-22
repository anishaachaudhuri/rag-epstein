from sqlalchemy import update

from app.db.session import SessionLocal
from app.models.entity import Entity


NORMALIZATION_MAP = {

    # United States
    "U.S.": "United States",
    "US": "United States",
    "USA": "United States",
    "America": "United States",
    "the United States": "United States",

    # United Kingdom
    "UK": "United Kingdom",
    "Britain": "United Kingdom",
    "England": "United Kingdom",

    # Trump
    "Trump": "Donald Trump",

    # Epstein
    "Epstein": "Jeffrey Epstein",
    "Jeffrey": "Jeffrey Epstein",
    "jeffrey E.": "Jeffrey Epstein",
    "jeffrey E. <": "Jeffrey Epstein",
    "JEE": "Jeffrey Epstein",

    # Clinton
    "Clinton": "Bill Clinton",
    "Bill": "Bill Clinton",

    # Hillary
    "Hillary": "Hillary Clinton",

    # Obama
    "Obama": "Barack Obama",
    "Barak Obama": "Barack Obama",

    # Snowden
    "Snowden": "Edward Snowden",

    # Putin
    "Putin": "Vladimir Putin",

    # Maxwell
    "Maxwell": "Ghislaine Maxwell",

    # Dershowitz
    "Dershowitz": "Alan Dershowitz",

    # Benjamin Netanyahu
    "Bibi": "Benjamin Netanyahu",

    # Prince Andrew
    "Andrew": "Prince Andrew",

    # Virginia Roberts
    "Roberts": "Virginia Roberts",
    "Virginia": "Virginia Roberts",

    # White House
    "the White House": "White House",

    # New York
    "NY": "New York",
    "New York City": "New York",

    # Angela Merkel
    "Angela Merkel's": "Angela Merkel",

    # Steve Bannon
    "Bannon": "Steve Bannon",

    # Landon Thomas
    "Thomas Jr.": "Landon Thomas",
    "landon jr thomas": "Landon Thomas",
    "Lando": "Landon Thomas",

    # Michael Wolff
    "Michael": "Michael Wolff",

    # George W. Bush
    "Bush": "George W. Bush",

    # Alexander Acosta
    "Acosta": "Alexander Acosta"
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