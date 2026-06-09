from app.db.session import SessionLocal

from app.models.document import Document
from app.models.chunk import Chunk
from app.models.entity import Entity


db = SessionLocal()

print(
    "Documents:",
    db.query(Document).count()
)

print(
    "Chunks:",
    db.query(Chunk).count()
)

print(
    "Entities:",
    db.query(Entity).count()
)

db.close()