from fastapi import (
    APIRouter,
    Response
)

from pydantic import BaseModel

from app.db.session import (
    SessionLocal
)

from app.services.synthesis_service import (
    generate_synthesis
)

from app.services.report_service import (
    build_report
)

router = APIRouter()


class ReportRequest(
    BaseModel
):
    query: str


@router.post(
    "/report"
)
def export_report(
    request:
    ReportRequest
):

    db = SessionLocal()

    try:

        result = (
            generate_synthesis(
                db=db,
                query=request.query
            )
        )

        filepath = (
            "investigative_report.pdf"
        )

        build_report(
            analysis=
            result[
                "analysis"
            ],
            query=
            request.query,
            output_path=
            filepath
        )

        with open(
            filepath,
            "rb"
        ) as file:

            pdf = (
                file.read()
            )

        return Response(
            content=pdf,
            media_type=
            "application/pdf",
            headers={
                "Content-Disposition":
                (
                    "attachment;"
                    " filename=report.pdf"
                )
            }
        )

    finally:

        db.close()