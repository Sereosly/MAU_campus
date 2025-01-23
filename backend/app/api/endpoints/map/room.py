from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.map.crud.room import (
    get_all_rooms, get_room_by_id, create_room, update_room, delete_room
)
from app.map.schemas.room import RoomCreate, RoomResponse
from app.database import get_db

router = APIRouter(prefix="/api/map/rooms", tags=["rooms"])

@router.get("/", response_model=List[RoomResponse])
def read_rooms(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    rooms = get_all_rooms(db, skip=skip, limit=limit)
    return rooms

@router.get("/{room_id}", response_model=RoomResponse)
def read_room(room_id: int, db: Session = Depends(get_db)):
    room = get_room_by_id(db, room_id)
    if room is None:
        raise HTTPException(status_code=404, detail="Room not found")
    return room

@router.post("/", response_model=RoomResponse)
def create_new_room(room: RoomCreate, db: Session = Depends(get_db)):
    return create_room(db, room)

@router.put("/{room_id}", response_model=RoomResponse)
def update_existing_room(room_id: int, room: RoomCreate, db: Session = Depends(get_db)):
    return update_room(db, room_id, room)

@router.delete("/{room_id}", response_model=RoomResponse)
def delete_existing_room(room_id: int, db: Session = Depends(get_db)):
    return delete_room(db, room_id)