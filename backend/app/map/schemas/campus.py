from pydantic import BaseModel
from typing import Optional, List

# Схема для создания кампуса
class CampusCreate(BaseModel):
    name: str
    description: Optional[str] = None
    image_path: Optional[str] = None


# Схема для отображения данных кампуса
class CampusResponse(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    image_path: Optional[str] = None

    class Config:
        orm_mode = True