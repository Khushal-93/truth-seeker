import torch
import torch.nn as nn

class TemporalModel(nn.Module):
    """
    Temporal analysis module using LSTM.
    """
    def __init__(self, input_size, hidden_size=128, num_layers=2, num_classes=1):
        super(TemporalModel, self).__init__()
        self.lstm = nn.LSTM(
            input_size=input_size, 
            hidden_size=hidden_size, 
            num_layers=num_layers, 
            batch_first=True, 
            bidirectional=True
        )
        self.dropout = nn.Dropout(0.5)
        # Bidirectional -> hidden_size * 2
        self.fc = nn.Linear(hidden_size * 2, num_classes)
        
    def forward(self, x):
        # x shape: (batch_size, seq_len, input_size)
        self.lstm.flatten_parameters()
        lstm_out, _ = self.lstm(x)
        # lstm_out: (batch, seq, hidden*2)
        
        # Attention or Simple Pooling?
        # Let's use Global Average Pooling over time for robustness
        avg_pool = torch.mean(lstm_out, dim=1)
        
        out = self.dropout(avg_pool)
        out = self.fc(out)
        return out
