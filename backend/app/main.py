from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from app.core.config import settings
from app.db.session import engine
from app.api.search import router as search_router
from app.api.documents import router as documents_router
from app.api.entities import router as entities_router
from app.api.entity_details import (
    router as entity_details_router
)
app = FastAPI(
    title="Investigative Intelligence Platform",
    version="1.0.0"
)

app.include_router(
    search_router,
    prefix="/api"
)

app.include_router(
    documents_router,
    prefix="/api"
)

app.include_router(
    entities_router,
    prefix="/api"
)

app.include_router(
    entity_details_router,
    prefix="/api"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "status": "running"
    }

@app.get("/health")
def health_check():
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        return {
            "database": "connected",
            "embedding_model": settings.EMBEDDING_MODEL
        }
    except Exception as e:
        return {
            "database": "failed",
            "error": str(e)
        }