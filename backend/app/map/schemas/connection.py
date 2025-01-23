from pydantic import BaseModel
from typing import Optional

class ConnectionCreate(BaseModel):
    room_id: Optional[int] = None
    segment_id: Optional[int] = None
    type: str
    weight: int

class ConnectionResponse(BaseModel):
    id: int
    room_id: Optional[int] = None
    segment_id: Optional[int] = None
    type: str
    weight: int

    class Config:
        orm_mode = True