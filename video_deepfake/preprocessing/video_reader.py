import cv2
import os

class VideoReader:
    """
    Handles video file reading and frame info extraction.
    """
    def __init__(self, video_path):
        if not os.path.exists(video_path):
            raise FileNotFoundError(f"Video file not found: {video_path}")
        self.video_path = video_path
        self.cap = cv2.VideoCapture(video_path)
        
    def get_frame_count(self):
        """Returns total number of frames."""
        return int(self.cap.get(cv2.CAP_PROP_FRAME_COUNT))
        
    def get_fps(self):
        """Returns video FPS."""
        return self.cap.get(cv2.CAP_PROP_FPS)
    
    def get_frame_at(self, index):
        """Seeks to specific frame index and returns it."""
        self.cap.set(cv2.CAP_PROP_POS_FRAMES, index)
        ret, frame = self.cap.read()
        if not ret:
            return None
        # Convert BGR to RGB
        return cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    def read_frame(self):
        """Reads the next frame sequentially."""
        ret, frame = self.cap.read()
        if not ret:
            return None
        return cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        
    def release(self):
        if self.cap.isOpened():
            self.cap.release()
