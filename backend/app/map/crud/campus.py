from sqlalchemy.orm import Session
from app.map.models.campus import Campus
from app.map.schemas.campus import CampusCreate


def get_all_campuses(db: Session):
    return db.query(Campus).all()


def get_campus_by_id(db: Session, campus_id: int):
    return db.query(Campus).filter(Campus.id == campus_id).first()


def create_campus(db: Session, campus: CampusCreate):
    new_campus = Campus(
        name=campus.name,
        description=campus.description,
        image_path=campus.image_path
    )
    db.add(new_campus)
    db.commit()
    db.refresh(new_campus)
    return new_campus


def update_campus(db: Session, campus_id: int, updated_data: CampusCreate):
    campus = db.query(Campus).filter(Campus.id == campus_id).first()
    if campus:
        campus.name = updated_data.name
        campus.description = updated_data.description
        campus.image_path = updated_data.image_path
        db.commit()
        db.refresh(campus)
    return campus


def delete_campus(db: Session, campus_id: int):
    campus = db.query(Campus).filter(Campus.id == campus_id).first()
    if campus:
        db.delete(campus)
        db.commit()
    return campus