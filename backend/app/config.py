from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"
DATASET_DIR = DATA_DIR / "dataset"

IMAGE_DIRS = [
    DATASET_DIR / "images" / "train",
    DATASET_DIR / "images" / "val",
]

LABEL_DIRS = [
    DATASET_DIR / "labels" / "train",
    DATASET_DIR / "labels" / "val",
]

CLASS_NAMES = ["defect"]