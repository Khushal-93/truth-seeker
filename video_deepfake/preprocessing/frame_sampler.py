import numpy as np

class FrameSampler:
    """
    Logic for sampling frames from a video.
    """
    def __init__(self, method='uniform', stride=10, max_frames=30):
        self.method = method
        self.stride = stride
        self.max_frames = max_frames
        
    def sample_indices(self, total_frames):
        """
        Returns a list of frame indices to process.
        """
        if total_frames <= 0:
            return []
            
        if self.method == 'uniform':
            # Basic strided sampling
            indices = list(range(0, total_frames, self.stride))
            
            # If we have too many, subsample to fit max_frames
            if len(indices) > self.max_frames:
                # Use linspace to pick evenly spaced frames from the selected ones
                # or just from the whole range
                indices = np.linspace(0, total_frames - 1, self.max_frames, dtype=int).tolist()
                
            return indices
        
        # Fallback to just the first N frames
        return list(range(min(total_frames, self.max_frames)))
