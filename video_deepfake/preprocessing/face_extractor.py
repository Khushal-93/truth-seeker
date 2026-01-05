import torch
from facenet_pytorch import MTCNN
from PIL import Image
import numpy as np
from torchvision import transforms

class FaceExtractor:
    """
    Extracts faces from frames using MTCNN.
    """
    def __init__(self, device='cpu', margin=20, image_size=224):
        self.device = device
        # EfficientNet usually takes 224x224
        self.mtcnn = MTCNN(
            keep_all=False, 
            select_largest=True, 
            device=device,
            margin=margin,
            image_size=image_size,
            post_process=False # Returns PIL Image
        )
        
        # Standard ImageNet normalization for TIMM models
        self.transform = transforms.Compose([
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
        ])
        
    def extract_face_tensor(self, frame_rgb):
        """
        Detects and returns the face tensor.
        Args:
            frame_rgb: numpy array (H, W, 3) or PIL Image
        Returns:
            torch.Tensor of shape (3, H, W) normalized for ImageNet, or None if no face found.
        """
        img = Image.fromarray(frame_rgb)
        
        # MTCNN forward returns a PIL Image if post_process=False and keep_all=False
        face_crop = self.mtcnn(img)
        
        if face_crop is not None:
            # Check if it's already a tensor (some MTCNN configurations do this)
            if isinstance(face_crop, torch.Tensor):
                # Ensure it's float and normalized? 
                # If it came out as tensor, it might be 0-255 or standardized.
                # Usually MTCNN returns standardized if post_process=True (default is True).
                # We set post_process=False, so ideally it should be PIL.
                # But if it IS a tensor, let's assume it needs just normalization if it's 0-1, 
                # or just return it if we are unsure. 
                # To be safe, let's allow it to pass through and just normalize if needed.
                # But transforms.Normalize expects tensor.
                # transforms.Compose includes ToTensor() which fails.
                
                # Separate transforms
                # If tensor, it's likely (C, H, W).
                # Just Normalize.
                normalize = transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
                # Ensure 0-1 range?
                if face_crop.max() > 1.0:
                    face_crop = face_crop.float() / 255.0
                return normalize(face_crop)
            
            # Apply transforms (To Tensor + Normalize)
            return self.transform(face_crop)
            
        return None
        
    def extract_face_batch(self, frames_rgb):
        """
        Batch processing if needed.
        """
        faces = []
        for frame in frames_rgb:
            f = self.extract_face_tensor(frame)
            if f is not None:
                faces.append(f)
            else:
                # Handle missing face? Zero pad? 
                faces.append(torch.zeros((3, 224, 224))) 
        if not faces:
            return None
        return torch.stack(faces)
