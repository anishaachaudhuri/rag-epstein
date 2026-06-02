from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func

from app.db.base import Base


class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)

    filename = Column(String, unique=True, nullable=False)

    document_type = Column(String, nullable=False)

    raw_text = Column(Text, nullable=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())