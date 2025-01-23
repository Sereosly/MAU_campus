from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.map.crud.building import (
    get_all_buildings, get_building_by_id, create_building, update_building, delete_building
)
from app.map.schemas.building import BuildingCreate, BuildingResponse
from app.database import get_db

router = APIRouter()

@router.get("/", response_model=List[BuildingResponse])
def read_buildings(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    buildings = get_all_buildings(db, skip=skip, limit=limit)
    return buildings

@router.get("/{building_id}", response_model=BuildingResponse)
def read_building(building_id: int, db: Session = Depends(get_db)):
    building = get_building_by_id(db, building_id)
    if building is None:
        raise HTTPException(status_code=404, detail="Building not found")
    return building

@router.post("/", response_model=BuildingResponse)
def create_new_building(building: BuildingCreate, db: Session = Depends(get_db)):
    return create_building(db, building)

@router.put("/{building_id}", response_model=BuildingResponse)
def update_existing_building(building_id: int, building: BuildingCreate, db: Session = Depends(get_db)):
    return update_building(db, building_id, building)

@router.delete("/{building_id}", response_model=BuildingResponse)
def delete_existing_building(building_id: int, db: Session = Depends(get_db)):
    return delete_building(db, building_id)