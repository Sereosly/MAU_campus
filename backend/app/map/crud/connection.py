from sqlalchemy.orm import Session
from app.map.models.connection import Connection
from app.map.schemas.connection import ConnectionCreate

def get_all_connections(db: Session):
    return db.query(Connection).all()

def get_connection_by_id(db: Session, connection_id: int):
    return db.query(Connection).filter(Connection.id == connection_id).first()

def create_connection(db: Session, connection: ConnectionCreate):
    new_connection = Connection(
        room_id=connection.room_id,
        segment_id=connection.segment_id,
        type=connection.type,
        weight=connection.weight
    )
    db.add(new_connection)
    db.commit()
    db.refresh(new_connection)
    return new_connection

def update_connection(db: Session, connection_id: int, updated_data: ConnectionCreate):
    connection = db.query(Connection).filter(Connection.id == connection_id).first()
    if connection:
        connection.room_id = updated_data.room_id
        connection.segment_id = updated_data.segment_id
        connection.type = updated_data.type
        connection.weight = updated_data.weight
        db.commit()
        db.refresh(connection)
    return connection

def delete_connection(db: Session, connection_id: int):
    connection = db.query(Connection).filter(Connection.id == connection_id).first()
    if connection:
        db.delete(connection)
        db.commit()
    return connection