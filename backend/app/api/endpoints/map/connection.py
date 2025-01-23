from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.map.crud.connection import (
    get_all_connections, get_connection_by_id, create_connection, update_connection, delete_connection
)
from app.map.schemas.connection import ConnectionCreate, ConnectionResponse
from app.database import get_db

router = APIRouter(prefix="/api/map/connections", tags=["connections"])

@router.get("/", response_model=List[ConnectionResponse])
def read_connections(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    connections = get_all_connections(db, skip=skip, limit=limit)
    return connections

@router.get("/{connection_id}", response_model=ConnectionResponse)
def read_connection(connection_id: int, db: Session = Depends(get_db)):
    connection = get_connection_by_id(db, connection_id)
    if connection is None:
        raise HTTPException(status_code=404, detail="Connection not found")
    return connection

@router.post("/", response_model=ConnectionResponse)
def create_new_connection(connection: ConnectionCreate, db: Session = Depends(get_db)):
    return create_connection(db, connection)

@router.put("/{connection_id}", response_model=ConnectionResponse)
def update_existing_connection(connection_id: int, connection: ConnectionCreate, db: Session = Depends(get_db)):
    return update_connection(db, connection_id, connection)

@router.delete("/{connection_id}", response_model=ConnectionResponse)
def delete_existing_connection(connection_id: int, db: Session = Depends(get_db)):
    return delete_connection(db, connection_id)