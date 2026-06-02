from sqlalchemy import (
    Column,
    Integer,
    String
)

from app.db.base import Base


class Relationship(Base):
    __tablename__ = "relationships"

    id = Column(Integer, primary_key=True)

    source_entity = Column(String, nullable=False)

    target_entity = Column(String, nullable=False)

    relationship_type = Column(String, nullable=False)