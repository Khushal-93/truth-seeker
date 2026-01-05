import os
import shutil
import uvicorn
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from tempfile import NamedTemporaryFile
import sys

# Ensure video_deepfake is in path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from video_deepfake.inference.predict import DeepfakeDetector

app = FastAPI(title="DeepGuard AI Server")

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all for development convenience
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Model (Lazy load or global)
# Using a global variable to load once
detector = None

@app.on_event("startup")
async def startup_event():
    global detector
    print("Loading AI Model...")
    try:
        # Assuming weights might be optional or auto-downloaded by timm/torch
        detector = DeepfakeDetector(device='cpu') # Default to CPU for safer compatibility, change to 'cuda' if sure
        print("AI Model Loaded Successfully!")
    except Exception as e:
        print(f"Failed to load model: {e}")
        # We don't exit, but inference will fail

@app.post("/api/analyze")
async def analyze_media(file: UploadFile = File(...)):
    global detector
    if detector is None:
        raise HTTPException(status_code=500, detail="Model not loaded")

    # Save uploaded file to temp
    suffix = os.path.splitext(file.filename)[1]
    with NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
        shutil.copyfileobj(file.file, tmp)
        tmp_path = tmp.name

    try:
        print(f"Analyzing file: {file.filename} at {tmp_path}")
        result = detector.predict(tmp_path)
        
        # Clean up
        os.unlink(tmp_path)
        
        if "error" in result:
             raise HTTPException(status_code=400, detail=result["error"])
             
        return result

    except Exception as e:
        print(f"Error analyzing {file.filename}: {e}")
        if os.path.exists(tmp_path):
            os.unlink(tmp_path)
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
