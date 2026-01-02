import { useState, useCallback } from "react";
import { Upload, Image as ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploaderProps {
  onImageSelect: (imageData: string) => void;
  isAnalyzing: boolean;
}

const ImageUploader = ({ onImageSelect, isAnalyzing }: ImageUploaderProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFile = useCallback((file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreview(result);
        onImageSelect(result);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageSelect]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, [handleFile]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  }, [handleFile]);

  const clearImage = useCallback(() => {
    setPreview(null);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {!preview ? (
        <label
          className={`relative flex flex-col items-center justify-center w-full h-72 rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer ${
            dragActive
              ? "border-primary bg-primary/10"
              : "border-border bg-card hover:border-primary/50 hover:bg-card/80"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
          
          <div className="flex flex-col items-center gap-4">
            <div className={`w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300 ${
              dragActive ? "bg-primary/20 scale-110" : "bg-secondary"
            }`}>
              <Upload className={`w-8 h-8 transition-colors ${dragActive ? "text-primary" : "text-muted-foreground"}`} />
            </div>
            
            <div className="text-center">
              <p className="text-lg font-medium text-foreground mb-1">
                Drop your image here
              </p>
              <p className="text-sm text-muted-foreground">
                or click to browse from your computer
              </p>
            </div>
            
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50">
              <ImageIcon className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                Supports: JPG, PNG, GIF, WebP
              </span>
            </div>
          </div>
        </label>
      ) : (
        <div className="relative rounded-2xl overflow-hidden border border-border bg-card">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-72 object-contain bg-background/50"
          />
          
          {/* Scanning animation overlay when analyzing */}
          {isAnalyzing && (
            <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
              <div className="absolute inset-0">
                <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-scan" />
              </div>
              <div className="text-center z-10">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
                <p className="text-foreground font-medium">Analyzing image...</p>
                <p className="text-sm text-muted-foreground">Looking for manipulation signs</p>
              </div>
            </div>
          )}
          
          {!isAnalyzing && (
            <Button
              variant="ghost"
              size="icon"
              onClick={clearImage}
              className="absolute top-4 right-4 bg-background/80 hover:bg-background"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
