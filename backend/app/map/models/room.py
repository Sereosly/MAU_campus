from sqlalchemy import Column, Integer, String, Float, Text, ForeignKey, JSON
from sqlalchemy.orm import relationship
from ...database import Base

class Room(Base):
    __tablename__ = "rooms"
    id = Column(Integer, primary_key=True, index=True)
    building_id = Column(Integer, ForeignKey("buildings.id"), nullable=False)
    floor_id = Column(Integer, ForeignKey("floors.id"), nullable=False)
    name = Column(String(255), nullable=False)  # Например, "Кабинет 201"
    cab_id = Column(String(50), nullable=False)  # Идентификатор для поиска
    coordinates = Column(JSON, nullable=True)  # Координаты в формате JSON
    description = Column(Text, nullable=True)

    building = relationship("Building", back_populates="rooms")
    floor = relationship("Floor", back_populates="rooms")
    connections = relationship("Connection", foreign_keys="[Connection.room_id]", back_populates="room")