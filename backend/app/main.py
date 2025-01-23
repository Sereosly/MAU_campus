from fastapi import FastAPI
from app.api.endpoints.map import campus, building, floor, room, segment, connection
# from app.api.endpoints.users import users  # Если есть модуль users

app = FastAPI()

# Подключаем роуты для модуля "map"
app.include_router(campus.router, prefix="/api/map/campuses", tags=["campuses"])
app.include_router(building.router, prefix="/api/map/buildings", tags=["buildings"])
app.include_router(floor.router, prefix="/api/map/floors", tags=["floors"])
app.include_router(room.router, prefix="/api/map/rooms", tags=["rooms"])
app.include_router(segment.router, prefix="/api/map/segments", tags=["segments"])
app.include_router(connection.router, prefix="/api/map/connections", tags=["connections"])

# # Подключаем роуты для модуля "users" (если есть)
# app.include_router(users.router, prefix="/api/users", tags=["users"])