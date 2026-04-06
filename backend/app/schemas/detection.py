from pydantic import BaseModel
from typing import List


class BoundingBox(BaseModel):
    label: str
    confidence: float
    x_center: float
    y_center: float
    width: float
    height: float


class DetectionResponse(BaseModel):
    image_name: str
    detections: List[BoundingBox]