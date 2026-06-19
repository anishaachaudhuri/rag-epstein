from fastapi import APIRouter
from pydantic import BaseModel

from app.db.session import SessionLocal

from app.services.synthesis_service import (
    generate_synthesis
)

router = APIRouter()


class SynthesisRequest(
    BaseModel
):
    query: str


@router.post(
    "/synthesis"
)
def synthesis(
    request:
    SynthesisRequest
):

    db = SessionLocal()

    try:

        return generate_synthesis(
            db=db,
            query=request.query
        )

    finally:
        db.close()