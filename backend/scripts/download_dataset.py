from huggingface_hub import hf_hub_download

path = hf_hub_download(
    repo_id="teyler/epstein-files-20k",
    filename="EPS_FILES_20K_NOV2025.txt",
    repo_type="dataset"
)

print(path)