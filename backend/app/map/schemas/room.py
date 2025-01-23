from pydantic import BaseModel
from typing import Optional, Dict

class RoomCreate(BaseModel):
    building_id: int
    floor_id: int
    name: str
    cab_id: str
    coordinates: Optional[Dict] = None
    description: Optional[str] = None

class RoomResponse(BaseModel):
    id: int
    building_id: int
    floor_id: int
    name: str
    cab_id: str
    coordinates: Optional[Dict] = None
    description: Optional[str] = None

    class Config:
        orm_mode = True