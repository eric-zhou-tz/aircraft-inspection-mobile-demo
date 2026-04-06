from pathlib import Path
from typing import List, Dict


def parse_yolo_label_file(label_path: Path, class_names: List[str]) -> List[Dict]:
    detections = []

    if not label_path.exists():
        return detections

    with open(label_path, "r", encoding="utf-8") as file:
        for line in file:
            parts = line.strip().split()
            if len(parts) != 5:
                continue

            class_id, x_center, y_center, width, height = parts
            class_id = int(class_id)

            if class_id < 0 or class_id >= len(class_names):
                continue

            detections.append(
                {
                    "label": class_names[class_id],
                    "confidence": 1.0,
                    "x_center": float(x_center),
                    "y_center": float(y_center),
                    "width": float(width),
                    "height": float(height),
                }
            )

    return detections