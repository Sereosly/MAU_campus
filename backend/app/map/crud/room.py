from sqlalchemy.orm import Session
from app.map.models.room import Room
from app.map.schemas.room import RoomCreate

def get_all_rooms(db: Session):
    return db.query(Room).all()

def get_room_by_id(db: Session, room_id: int):
    return db.query(Room).filter(Room.id == room_id).first()

def create_room(db: Session, room: RoomCreate):
    new_room = Room(
        building_id=room.building_id,
        floor_id=room.floor_id,
        name=room.name,
        cab_id=room.cab_id,
        coordinates=room.coordinates,
        description=room.description
    )
    db.add(new_room)
    db.commit()
    db.refresh(new_room)
    return new_room

def update_room(db: Session, room_id: int, updated_data: RoomCreate):
    room = db.query(Room).filter(Room.id == room_id).first()
    if room:
        room.building_id = updated_data.building_id
        room.floor_id = updated_data.floor_id
        room.name = updated_data.name
        room.cab_id = updated_data.cab_id
        room.coordinates = updated_data.coordinates
        room.description = updated_data.description
        db.commit()
        db.refresh(room)
    return room

def delete_room(db: Session, room_id: int):
    room = db.query(Room).filter(Room.id == room_id).first()
    if room:
        db.delete(room)
        db.commit()
    return room