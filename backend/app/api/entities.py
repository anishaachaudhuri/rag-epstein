from fastapi import APIRouter
from sqlalchemy import func

from app.db.session import SessionLocal

from app.models.entity import Entity

router = APIRouter(
    prefix="/entities",
    tags=["entities"]
)

@router.get("/")
def get_entities():

    db = SessionLocal()

    try:

        entities = (
            db.query(
                Entity.entity_text,
                Entity.entity_label,
                func.count(Entity.id)
            )
            .group_by(
                Entity.entity_text,
                Entity.entity_label
            )
            .order_by(
                func.count(Entity.id).desc()
            )
            .limit(100)
            .all()
        )

        return [
            {
                "name": e[0],
                "label": e[1],
                "mentions": e[2]
            }
            for e in entities
        ]

    finally:
        db.close()