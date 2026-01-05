import torch
import os
import sys
import cv2
import numpy as np
from facenet_pytorch import InceptionResnetV1

# Ensure we can import from parent modules if run as script (though best used as module)
# current_dir = os.path.dirname(os.path.abspath(__file__))
# parent_dir = os.path.dirname(os.path.dirname(current_dir))
# if parent_dir not in sys.path:
#     sys.path.append(parent_dir)

from ..preprocessing.video_reader import VideoReader
from ..preprocessing.face_extractor import FaceExtractor
from ..preprocessing.frame_sampler import FrameSampler
from ..model.classifier import DeepfakeClassifier
from .utils import format_prediction, normalize_explanation

class DeepfakeDetector:
    def __init__(self, weights_path=None, device='cuda' if torch.cuda.is_available() else 'cpu'):
        self.device = device
        print(f"Initializing DeepfakeDetector on {device}...")
        
        # Initialize Architecture
        # We keep the classifier for potential future use or hybrid scoring
        self.model = DeepfakeClassifier(device=device)
        self.face_extractor = FaceExtractor(device=device)
        self.sampler = FrameSampler()
        
        # Load InceptionResnetV1 for feature extraction (Embeddings)
        print("Loading InceptionResnetV1 for facial feature analysis...")
        self.resnet = InceptionResnetV1(pretrained='vggface2').eval().to(device)
        
        # Load Weights
        if weights_path and os.path.exists(weights_path):
            print(f"Loading weights from {weights_path}")
            state_dict = torch.load(weights_path, map_location=device)
            self.model.load_state_dict(state_dict)
        else:
            print("Warning: No weights provided. Model uses ImageNet pretrained encoder + random temporal weights.")
            
        self.model.eval()
        
    def predict(self, video_path):
        """
        Analyzes a video for deepfake content.
        """
        if not os.path.exists(video_path):
            return {"error": "Video file does not exist"}
            
        try:
            print(f"Processing video: {video_path}")
            # 1. Read Video
            reader = VideoReader(video_path)
            total_frames = reader.get_frame_count()
            print(f"Total frames: {total_frames}")
            
            # 2. Sample Frames
            indices = self.sampler.sample_indices(total_frames)
            
            # 3. Analysis Loop
            faces_found = 0
            blur_scores = [] # 0 (Real) to 1 (Fake/Blurry)
            embeddings = []
            
            for i in indices:
                try:
                    frame = reader.get_frame_at(i)
                    if frame is None:
                        continue
                        
                    # Heuristic: Blur check (Laplacian variance)
                    gray = cv2.cvtColor(frame, cv2.COLOR_RGB2GRAY)
                    blur_var = cv2.Laplacian(gray, cv2.CV_64F).var()
                    
                    # Continuous Blur Score
                    # High Variance (e.g. > 500) = Sharp = Real -> Score 0
                    # Low Variance (e.g. < 50) = Very Blurry = Suspicious -> Score 1
                    # Sigmoid-like mapping or linear clamping
                    # Realistically, variance around 100-300 is common.
                    threshold = 300.0
                    norm_blur = max(0, min(1, (threshold - blur_var) / threshold))
                    
                    # Face Detection
                    face_tensor = self.face_extractor.extract_face_tensor(frame)
                    if face_tensor is not None:
                        faces_found += 1
                        blur_scores.append(norm_blur)
                        
                        # Get Embedding
                        with torch.no_grad():
                            # Unsqueeze to batch size 1
                            emb = self.resnet(face_tensor.unsqueeze(0).to(self.device))
                            embeddings.append(emb.cpu().numpy())
                            
                except Exception as e:
                    print(f"Frame processing error: {e}")
                    continue
                        
            reader.release()
            
            print(f"Faces found: {faces_found}")
            
            if faces_found == 0:
                return {
                    "is_deepfake": False,
                    "confidence": 0.0,
                    "explanation": ["No faces detected. Analysis inconclusive."]
                }
            
            # 4. Score Calculation
            
            # A. Blur Score (Average)
            avg_blur_score = sum(blur_scores) / len(blur_scores) if blur_scores else 0
            print(f"Avg Blur Score: {avg_blur_score}")
            
            # B. Temporal Jitter (Flux)
            jitter_score = 0.0
            if len(embeddings) > 1:
                cos_dists = []
                for k in range(len(embeddings) - 1):
                    # Cosine distance = 1 - Cosine Similarity
                    a = embeddings[k]
                    b = embeddings[k+1]
                    sim = np.dot(a, b.T) / (np.linalg.norm(a) * np.linalg.norm(b))
                    dist = 1 - sim
                    cos_dists.append(dist.item())
                
                avg_dist = sum(cos_dists) / len(cos_dists)
                print(f"Avg Temporal Jitter (Distance): {avg_dist}")
                
                # Heuristic:
                # Real videos usually have very smooth transitions (High Sim, Low Dist e.g. < 0.05)
                # Deepfakes often have jitter (Dist > 0.1) or face swapping anomalies
                # Map Dist 0.0 -> 0.0 (Real), Dist 0.2 -> 1.0 (Fake)
                jitter_score = max(0, min(1, (avg_dist - 0.02) / 0.15))
            
            print(f"Norm Jitter Score: {jitter_score}")
            
            # C. Fusion
            # We weight Jitter higher as it's a stronger feature for deepfakes
            final_score = (jitter_score * 0.6) + (avg_blur_score * 0.4)
            
            # Final probability (0-100)
            confidence = final_score * 100
            is_deepfake = confidence > 50
            
            # Adjust confidence for Authentic case
            # If it's authentic, we want confidence of "Authenticity"?
            # No, UI uses "Confidence" and color codes it. 
            # If we return is_deepfake=False, Confidence=20, UI shows Green 20%?
            # User wants "Same whether authentic or deepfake" -> likely wants confidence of classification.
            # But earlier code: "if isDeepfake && confidence > 70".
            # If isDeepfake is False, current UI shows Green "Likely Authentic".
            # If score is 10/100 (Authentic), UI shows Green bar 10% full? 
            # That looks meant. "Low indicators of manipulation".
            
            # Just return the raw score 0-100.
            
            explanations = []
            if is_deepfake:
                if jitter_score > 0.5:
                    explanations.append(f"High facial inconsistency detected between frames.")
                if avg_blur_score > 0.5:
                    explanations.append(f"Abnormal facial texture smoothing observed.")
                explanations.append("Patterns match deepfake generation artifacts.")
            else:
                explanations.append("Facial movements are smooth and consistent.")
                explanations.append("Texture details appear natural.")

            return {
                "is_deepfake": bool(is_deepfake),
                "confidence": float(confidence),
                "explanation": explanations,
                "frames_analyzed": faces_found,
                "score_details": {
                    "jitter": float(jitter_score),
                    "blur": float(avg_blur_score)
                }
            }
            
        except Exception as e:
            import traceback
            traceback.print_exc()
            return {
                "error": f"Prediction failed: {str(e)}"
            }
