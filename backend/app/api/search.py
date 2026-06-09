from fastapi import APIRouter
from pydantic import BaseModel

from app.db.session import SessionLocal

from app.services.search_service import (
    search_documents
)

router = APIRouter()


class SearchRequest(BaseModel):
    query: str


@router.post("/search")
def search(request: SearchRequest):

    db = SessionLocal()

    try:

        return search_documents(
            db=db,
            query=request.query
        )

    finally:
        db.close()