from pydantic import BaseModel

class SegmentCreate(BaseModel):
    type: str
    building_id: int
    floor: int
    connection_type: str
    start_x: float
    start_y: float
    end_x: float
    end_y: float

class SegmentResponse(BaseModel):
    id: int
    type: str
    building_id: int
    floor: int
    connection_type: str
    start_x: float
    start_y: float
    end_x: float
    end_y: float

    class Config:
        orm_mode = True