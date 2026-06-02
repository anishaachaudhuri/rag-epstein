from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    ForeignKey
)

from sqlalchemy.orm import relationship

from pgvector.sqlalchemy import Vector

from app.db.base import Base


class Chunk(Base):
    __tablename__ = "chunks"

    id = Column(Integer, primary_key=True, index=True)

    document_id = Column(
        Integer,
        ForeignKey("documents.id")
    )

    chunk_index = Column(Integer, nullable=False)

    chunk_id = Column(String, unique=True, nullable=False)

    text = Column(Text, nullable=False)

    embedding = Column(Vector(384))

    entities = Column(Text)

    document = relationship("Document")