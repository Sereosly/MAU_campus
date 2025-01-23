from sqlalchemy import Column, Integer, String, Float, Text, ForeignKey, JSON
from sqlalchemy.orm import relationship
from ...database import Base


class Segment(Base):
    __tablename__ = "segments"
    id = Column(Integer, primary_key=True, index=True)
    type = Column(String(50), nullable=False)  # Тип сегмента ("corridor", "staircase", ...)
    building_id = Column(Integer, ForeignKey("buildings.id"), nullable=False)
    floor = Column(Integer, nullable=False)
    connection_type = Column(String(50), nullable=False)  # Тип связи (динамическое значение)
    start_x = Column(Float, nullable=False)  # Координата X начала
    start_y = Column(Float, nullable=False)  # Координата Y начала
    end_x = Column(Float, nullable=False)  # Координата X конца
    end_y = Column(Float, nullable=False)  # Координата Y конца

    building = relationship("Building", back_populates="segments")
    connections = relationship("Connection", foreign_keys="[Connection.segment_id]", back_populates="segment")