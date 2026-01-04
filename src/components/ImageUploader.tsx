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
    <div className="w-full max-w-xl mx-auto">
      {!preview ? (
        <label className="flex flex-col items-center justify-center h-72 border-2 border-dashed rounded-xl cursor-pointer">
          <input
            type="file"
            accept="image/*"
            hidden
            disabled={isAnalyzing}
            onChange={(e) => e.target.files && handleFile(e.target.files[0])}
          />
          <Upload className="w-10 h-10 mb-2" />
          <p>Click or drop an image</p>
        </label>
      ) : (
        <div className="relative">
          <img src={preview} className="rounded-lg" />
          <Button
            size="icon"
            variant="destructive"
            className="absolute top-2 right-2"
            onClick={() => setPreview(null)}
          >
            <X />
          </Button>
        </div>
      )}
    </div>
  );
}
