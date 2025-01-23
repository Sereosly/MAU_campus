from sqlalchemy.orm import Session
from app.map.models.floor import Floor
from app.map.schemas.floor import FloorCreate

def get_all_floors(db: Session):
    return db.query(Floor).all()

def get_floor_by_id(db: Session, floor_id: int):
    return db.query(Floor).filter(Floor.id == floor_id).first()

def create_floor(db: Session, floor: FloorCreate):
    new_floor = Floor(
        building_id=floor.building_id,
        floor_number=floor.floor_number,
        image_path=floor.image_path,
        description=floor.description
    )
    db.add(new_floor)
    db.commit()
    db.refresh(new_floor)
    return new_floor

def update_floor(db: Session, floor_id: int, updated_data: FloorCreate):
    floor = db.query(Floor).filter(Floor.id == floor_id).first()
    if floor:
        floor.building_id = updated_data.building_id
        floor.floor_number = updated_data.floor_number
        floor.image_path = updated_data.image_path
        floor.description = updated_data.description
        db.commit()
        db.refresh(floor)
    return floor

def delete_floor(db: Session, floor_id: int):
    floor = db.query(Floor).filter(Floor.id == floor_id).first()
    if floor:
        db.delete(floor)
        db.commit()
    return floor