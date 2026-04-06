from pathlib import Path
from app.config import LABEL_DIRS, CLASS_NAMES
from app.utils.yolo import parse_yolo_label_file


class DemoDetectionService:
    def _find_label_file(self, image_name: str) -> Path | None:
        label_name = Path(image_name).stem + ".txt"

        for label_dir in LABEL_DIRS:
            candidate = label_dir / label_name
            if candidate.exists():
                return candidate

        return None

    def detect_defects(self, image_name: str):
        label_path = self._find_label_file(image_name)

        if label_path is None:
            return []

        return parse_yolo_label_file(label_path, CLASS_NAMES)