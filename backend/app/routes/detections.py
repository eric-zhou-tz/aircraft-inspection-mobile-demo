from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.schemas.detection import DetectionResponse
from app.services.detection.demo_detection_service import DemoDetectionService

router = APIRouter()
detection_service = DemoDetectionService()


class DetectionRequest(BaseModel):
    image_name: str


@router.post("/detect", response_model=DetectionResponse)
def detect(request: DetectionRequest):
    if not request.image_name:
        raise HTTPException(status_code=400, detail="image_name is required")

    detections = detection_service.detect_defects(request.image_name)

    return DetectionResponse(
        image_name=request.image_name,
        detections=detections,
    )