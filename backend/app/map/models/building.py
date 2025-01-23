from sqlalchemy import Column, Integer, String, Float, Text, ForeignKey, JSON
from sqlalchemy.orm import relationship
from ...database import Base


class Building(Base):
    __tablename__ = "buildings"
    id = Column(Integer, primary_key=True, index=True)
    campus_id = Column(Integer, ForeignKey("campuses.id"), nullable=False)
    name = Column(String(255), nullable=False)
    x = Column(Float, nullable=False)  # Координата X входа
    y = Column(Float, nullable=False)  # Координата Y входа
    description = Column(Text, nullable=True)
    image_path = Column(String(255), nullable=True)  # Ссылка на изображение здания

    campus = relationship("Campus", back_populates="buildings")
    floors = relationship("Floor", back_populates="building")