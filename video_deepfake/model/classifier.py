import torch
import torch.nn as nn
import timm
from .temporal_model import TemporalModel

class DeepfakeClassifier(nn.Module):
    """
    Hybrid Architecture: CNN (EfficientNet) + LSTM.
    """
    def __init__(self, encoder_name='efficientnet_b4', pretrained=True, device='cpu'):
        super(DeepfakeClassifier, self).__init__()
        self.device = device
        
        # 1. Feature Extractor (CNN)
        # num_classes=0 -> returns pooled feature vector
        print(f"Loading encoder: {encoder_name}...")
        self.encoder = timm.create_model(encoder_name, pretrained=pretrained, num_classes=0)
        
        # Determine input size for temporal model
        # Create a dummy input to check output shape
        dummy_input = torch.randn(1, 3, 224, 224)
        with torch.no_grad():
            features = self.encoder(dummy_input)
        input_dim = features.shape[1]
        
        print(f"Feature dimension: {input_dim}")
        
        # 2. Temporal Model
        self.temporal = TemporalModel(input_size=input_dim)
        
        self.sigmoid = nn.Sigmoid()
        self.to(device)
        
    def forward(self, x):
        """
        Args:
            x: Tensor of shape (Batch, Seq, Channels, Height, Width)
               containing face crops.
        """
        b, s, c, h, w = x.shape
        
        # Combine batch and seq explicitly for CNN
        x = x.view(b * s, c, h, w)
        
        # CNN Feature Extraction
        features = self.encoder(x) # (B*S, FeatureDim)
        
        # Reshape back to sequence
        features = features.view(b, s, -1)
        
        # Temporal Analysis
        logits = self.temporal(features)
        
        # Output probability
        return self.sigmoid(logits)
