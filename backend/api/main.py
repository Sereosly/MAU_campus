from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/north_campus")
def get_north_campus_coordinates():
    return {
        "coordinates": [[55.7558, 37.6173], [55.7550, 37.6170]]
    }

@app.get("/south_campus")
def get_south_campus_coordinates():
    return {
        "coordinates": [[55.7358, 37.6073], [55.7350, 37.6070]]
    }
