from pydantic import BaseModel
from typing import Optional

class FloorCreate(BaseModel):
    building_id: int
    floor_number: int
    image_path: Optional[str] = None
    description: Optional[str] = None

class FloorResponse(BaseModel):
    id: int
    building_id: int
    floor_number: int
    image_path: Optional[str] = None
    description: Optional[str] = None

    class Config:
        orm_mode = True