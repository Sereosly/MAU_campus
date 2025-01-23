from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.map.crud.segment import (
    get_all_segments, get_segment_by_id, create_segment, update_segment, delete_segment
)
from app.map.schemas.segment import SegmentCreate, SegmentResponse
from app.database import get_db

router = APIRouter(prefix="/api/map/segments", tags=["segments"])

@router.get("/", response_model=List[SegmentResponse])
def read_segments(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    segments = get_all_segments(db, skip=skip, limit=limit)
    return segments

@router.get("/{segment_id}", response_model=SegmentResponse)
def read_segment(segment_id: int, db: Session = Depends(get_db)):
    segment = get_segment_by_id(db, segment_id)
    if segment is None:
        raise HTTPException(status_code=404, detail="Segment not found")
    return segment

@router.post("/", response_model=SegmentResponse)
def create_new_segment(segment: SegmentCreate, db: Session = Depends(get_db)):
    return create_segment(db, segment)

@router.put("/{segment_id}", response_model=SegmentResponse)
def update_existing_segment(segment_id: int, segment: SegmentCreate, db: Session = Depends(get_db)):
    return update_segment(db, segment_id, segment)

@router.delete("/{segment_id}", response_model=SegmentResponse)
def delete_existing_segment(segment_id: int, db: Session = Depends(get_db)):
    return delete_segment(db, segment_id)