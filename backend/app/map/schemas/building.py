from pydantic import BaseModel
from typing import Optional

class BuildingCreate(BaseModel):
    campus_id: int
    name: str
    x: float
    y: float
    description: Optional[str] = None
    image_path: Optional[str] = None

class BuildingResponse(BaseModel):
    id: int
    campus_id: int
    name: str
    x: float
    y: float
    description: Optional[str] = None
    image_path: Optional[str] = None

    class Config:
        orm_mode = True