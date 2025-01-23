from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.map.crud.campus import get_all_campuses, get_campus_by_id, create_campus, update_campus, delete_campus
from app.map.schemas.campus import CampusCreate, CampusResponse
from app.database import get_db

router = APIRouter()

@router.get("/", response_model=list[CampusResponse])
def read_campuses(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    campuses = get_all_campuses(db)
    return campuses

@router.get("/{campus_id}", response_model=CampusResponse)
def read_campus(campus_id: int, db: Session = Depends(get_db)):
    campus = get_campus_by_id(db, campus_id)
    if campus is None:
        raise HTTPException(status_code=404, detail="Campus not found")
    return campus

@router.post("/", response_model=CampusResponse)
def create_new_campus(campus: CampusCreate, db: Session = Depends(get_db)):
    return create_campus(db, campus)

@router.put("/{campus_id}", response_model=CampusResponse)
def update_existing_campus(campus_id: int, campus: CampusCreate, db: Session = Depends(get_db)):
    return update_campus(db, campus_id, campus)

@router.delete("/{campus_id}", response_model=CampusResponse)
def delete_existing_campus(campus_id: int, db: Session = Depends(get_db)):
    return delete_campus(db, campus_id)