from sqlalchemy import Column, Integer, String, Float, Text, ForeignKey, JSON
from sqlalchemy.orm import relationship
from ...database import Base


class Campus(Base):
    __tablename__ = "campuses"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    image_path = Column(String(255), nullable=True)  # Ссылка на изображение кампуса

    buildings = relationship("Building", back_populates="campus")