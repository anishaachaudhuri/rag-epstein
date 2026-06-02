from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey
)

from app.db.base import Base


class Entity(Base):
    __tablename__ = "entities"

    id = Column(Integer, primary_key=True)

    chunk_id = Column(
        Integer,
        ForeignKey("chunks.id")
    )

    entity_text = Column(String, nullable=False)

    entity_label = Column(String, nullable=False)