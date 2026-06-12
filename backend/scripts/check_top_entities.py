from collections import Counter

from app.db.session import SessionLocal
from app.models.entity import Entity

db = SessionLocal()

entities = (
    db.query(Entity.entity_text)
    .all()
)

counter = Counter(
    entity[0]
    for entity in entities
)

for entity, count in counter.most_common(100):
    print(f"{count:5} | {entity}")