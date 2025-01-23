from sqlalchemy.orm import Session
from app.map.models.segment import Segment
from app.map.schemas.segment import SegmentCreate

def get_all_segments(db: Session):
    return db.query(Segment).all()

def get_segment_by_id(db: Session, segment_id: int):
    return db.query(Segment).filter(Segment.id == segment_id).first()

def create_segment(db: Session, segment: SegmentCreate):
    new_segment = Segment(
        type=segment.type,
        building_id=segment.building_id,
        floor=segment.floor,
        connection_type=segment.connection_type,
        start_x=segment.start_x,
        start_y=segment.start_y,
        end_x=segment.end_x,
        end_y=segment.end_y
    )
    db.add(new_segment)
    db.commit()
    db.refresh(new_segment)
    return new_segment

def update_segment(db: Session, segment_id: int, updated_data: SegmentCreate):
    segment = db.query(Segment).filter(Segment.id == segment_id).first()
    if segment:
        segment.type = updated_data.type
        segment.building_id = updated_data.building_id
        segment.floor = updated_data.floor
        segment.connection_type = updated_data.connection_type
        segment.start_x = updated_data.start_x
        segment.start_y = updated_data.start_y
        segment.end_x = updated_data.end_x
        segment.end_y = updated_data.end_y
        db.commit()
        db.refresh(segment)
    return segment

def delete_segment(db: Session, segment_id: int):
    segment = db.query(Segment).filter(Segment.id == segment_id).first()
    if segment:
        db.delete(segment)
        db.commit()
    return segment