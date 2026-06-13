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
                func.count(Entity.id).label(
                    "mentions"
                )
            )
            .group_by(
                Entity.entity_text
            )
            .order_by(
                func.count(
                    Entity.id
                ).desc()
            )
            .limit(100)
            .all()
        )

        return [
            {
                "name": entity.entity_text,
                "mentions": entity.mentions
            }
            for entity in entities
        ]

    finally:
        db.close()