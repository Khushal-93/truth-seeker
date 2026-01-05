# Deepfake Video Detection Module

A production-ready, modular deepfake video detection system using a hybrid CNN + Temporal (LSTM/Transformer) architecture.

## Architecture

1.  **Face Detection**: Uses MTCNN (via `facenet-pytorch`) to detect and align faces frame-by-frame.
2.  **Feature Extraction**: Uses EfficientNet-B4 (via `timm`) or XceptionNet to extract spatial features from face crops.
3.  **Temporal Modeling**: Uses an LSTM network to analyze the sequence of spatial features for temporal inconsistencies (common in deepfakes).
4.  **Classification**: Improving robustness by analyzing frame sequences rather than single frames.

## Installation

```bash
pip install -r requirements.txt
```

## Usage

```python
from video_deepfake.inference.predict import DeepfakeDetector

# Initialize
detector = DeepfakeDetector(
    model_path="path/to/weights.pth", # Optional: load pretrained weights
    device="cuda" # or "cpu"
)

# Run Inference
result = detector.predict("path/to/video.mp4")

print(result)
# {
#   "is_deepfake": true,
#   "confidence": 92.5,
#   "explanation": ["High temporal inconsistency in facial features"]
# }
```

## Hardware Requirements

- **GPU**: Recommended for real-time or fast inference (NVIDIA CUDA).
- **CPU**: Supported but slower.
- **RAM**: At least 8GB recommended.

## Ethical Disclaimer

This tool provides a probabilistic score. It should not be used as the sole determinant of truth. Results can be affected by video quality, lighting, and compression. No biometric data is permanently stored.
