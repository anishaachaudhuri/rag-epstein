from sqlalchemy import text

from app.db.base import Base
from app.db.session import engine

from app.models.document import Document
from app.models.chunk import Chunk
from app.models.entity import Entity
from app.models.relationship import Relationship


def init_db():
    with engine.connect() as conn:
        conn.execute(text("CREATE EXTENSION IF NOT EXISTS vector"))
        conn.commit()

    Base.metadata.create_all(bind=engine)


if __name__ == "__main__":
    init_db()
    print("Database initialized.")