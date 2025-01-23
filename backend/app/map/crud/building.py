from sqlalchemy.orm import Session
from app.map.models.building import Building
from app.map.schemas.building import BuildingCreate

def get_all_buildings(db: Session):
    return db.query(Building).all()

def get_building_by_id(db: Session, building_id: int):
    return db.query(Building).filter(Building.id == building_id).first()

def create_building(db: Session, building: BuildingCreate):
    new_building = Building(
        campus_id=building.campus_id,
        name=building.name,
        x=building.x,
        y=building.y,
        description=building.description,
        image_path=building.image_path
    )
    db.add(new_building)
    db.commit()
    db.refresh(new_building)
    return new_building

def update_building(db: Session, building_id: int, updated_data: BuildingCreate):
    building = db.query(Building).filter(Building.id == building_id).first()
    if building:
        building.campus_id = updated_data.campus_id
        building.name = updated_data.name
        building.x = updated_data.x
        building.y = updated_data.y
        building.description = updated_data.description
        building.image_path = updated_data.image_path
        db.commit()
        db.refresh(building)
    return building

def delete_building(db: Session, building_id: int):
    building = db.query(Building).filter(Building.id == building_id).first()
    if building:
        db.delete(building)
        db.commit()
    return building