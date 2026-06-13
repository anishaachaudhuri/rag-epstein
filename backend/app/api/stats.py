from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db

from app.models.document import Document
from app.models.chunk import Chunk
from app.models.entity import Entity

router = APIRouter()


@router.get("/stats")
def get_stats(
    db: Session = Depends(get_db)
):
    return {
        "documents":
            db.query(Document).count(),

        "chunks":
            db.query(Chunk).count(),

        "entities":
            db.query(Entity).count()
    }