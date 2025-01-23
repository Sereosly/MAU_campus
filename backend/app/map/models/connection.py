from sqlalchemy import Column, Integer, String, Float, Text, ForeignKey, JSON
from sqlalchemy.orm import relationship
from ...database import Base


class Connection(Base):
    __tablename__ = "connections"
    id = Column(Integer, primary_key=True, index=True)
    room_id = Column(Integer, ForeignKey("rooms.id"), nullable=True)
    segment_id = Column(Integer, ForeignKey("segments.id"), nullable=True)
    type = Column(String(50), nullable=False)  # Тип связи (динамическое значение)
    weight = Column(Integer, nullable=False)  # Вес соединения

    room = relationship("Room", back_populates="connections")
    segment = relationship("Segment", back_populates="connections")