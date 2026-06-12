import csv
import sys
from huggingface_hub import hf_hub_download
csv.field_size_limit(sys.maxsize)
DATASET_REPO = "teyler/epstein-files-20k"
DATASET_FILE = "EPS_FILES_20K_NOV2025.txt"


def get_dataset_path():

    path = hf_hub_download(
        repo_id=DATASET_REPO,
        filename=DATASET_FILE,
        repo_type="dataset"
    )

    return path


def stream_documents():

    path = get_dataset_path()

    with open(
        path,
        "r",
        encoding="utf-8",
        errors="ignore",
        newline=""
    ) as f:

        reader = csv.DictReader(f)

        for row in reader:

            yield {
                "filename": row["filename"],
                "text": row["text"]
            }