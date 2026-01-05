from ..preprocessing.face_extractor import FaceExtractor

class FaceDetector:
    """
    Wrapper for Face Detection logic.
    Delegates to the preprocessing module's FaceExtractor.
    """
    def __init__(self, device='cpu'):
        self.extractor = FaceExtractor(device=device)
        
    def detect(self, frame_rgb):
        return self.extractor.extract_face_tensor(frame_rgb)
    
    def detect_batch(self, frames_rgb):
        return self.extractor.extract_face_batch(frames_rgb)
