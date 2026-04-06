from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.detections import router as detection_router

app = FastAPI(title="Aircraft Defect Detection Demo API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten later if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(detection_router, prefix="/api")


@app.get("/")
def root():
    return {"message": "Aircraft defect detection backend is running"}