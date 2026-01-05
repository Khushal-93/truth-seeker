import { useState, useCallback } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  isAnalyzing: boolean;
}

export default function ImageUploader({
  onImageSelect,
  isAnalyzing,
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return;

      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(file);

      onImageSelect(file);
    },
    [onImageSelect]
  );

  return (
    <div className="w-full max-w-2xl mx-auto">
      {!preview ? (
        <div className="bg-white rounded-2xl border border-border shadow-xl p-8 hover:shadow-2xl transition-all duration-200 ease-in-out">
          <label className="flex flex-col items-center justify-center h-80 border-2 border-dashed border-primary/30 rounded-xl cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 ease-in-out group">
            <input
              type="file"
              accept="image/*"
              hidden
              disabled={isAnalyzing}
              onChange={(e) => e.target.files && handleFile(e.target.files[0])}
            />
            {isAnalyzing ? (
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                <p className="text-muted-foreground font-medium">Analyzing...</p>
              </div>
            ) : (
              <>
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-200 ease-in-out">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <p className="text-foreground font-medium text-lg mb-2">Click or drop an image</p>
                <p className="text-muted-foreground text-sm">PNG, JPG, GIF up to 10MB</p>
              </>
            )}
          </label>
        </div>
      ) : (
        <div className="relative bg-white rounded-2xl border border-border shadow-xl p-4 hover:shadow-2xl transition-all duration-200 ease-in-out">
          <img src={preview} alt="Preview" className="rounded-xl w-full h-auto max-h-96 object-contain" />
          <Button
            size="icon"
            variant="destructive"
            className="absolute top-4 right-4 shadow-lg hover:scale-110 transition-all duration-200 ease-in-out"
            onClick={() => setPreview(null)}
          >
            <X />
          </Button>
        </div>
      )}
    </div>
  );
}
