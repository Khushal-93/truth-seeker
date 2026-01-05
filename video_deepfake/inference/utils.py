def format_prediction(score, threshold=0.5):
    """
    Formats the raw probability into a structured result.
    """
    is_deepfake = score > threshold
    confidence = score * 100
    
    return {
        "is_deepfake": bool(is_deepfake),
        "confidence": float(confidence),
        "label": "DEEPFAKE" if is_deepfake else "REAL"
    }

def normalize_explanation(score):
    if score > 0.8:
        return "High confidence deepfake detection based on temporal and spatial anomalies."
    elif score > 0.5:
        return "Possible manipulation detected."
    elif score < 0.2:
        return "High confidence real video."
    else:
        return "Likely real video."
