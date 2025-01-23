from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.map.crud.floor import (
    get_all_floors, get_floor_by_id, create_floor, update_floor, delete_floor
)
from app.map.schemas.floor import FloorCreate, FloorResponse
from app.database import get_db

router = APIRouter(prefix="/api/map/floors", tags=["floors"])

@router.get("/", response_model=List[FloorResponse])
def read_floors(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    floors = get_all_floors(db, skip=skip, limit=limit)
    return floors

@router.get("/{floor_id}", response_model=FloorResponse)
def read_floor(floor_id: int, db: Session = Depends(get_db)):
    floor = get_floor_by_id(db, floor_id)
    if floor is None:
        raise HTTPException(status_code=404, detail="Floor not found")
    return floor

@router.post("/", response_model=FloorResponse)
def create_new_floor(floor: FloorCreate, db: Session = Depends(get_db)):
    return create_floor(db, floor)

@router.put("/{floor_id}", response_model=FloorResponse)
def update_existing_floor(floor_id: int, floor: FloorCreate, db: Session = Depends(get_db)):
    return update_floor(db, floor_id, floor)

@router.delete("/{floor_id}", response_model=FloorResponse)
def delete_existing_floor(floor_id: int, db: Session = Depends(get_db)):
    return delete_floor(db, floor_id)