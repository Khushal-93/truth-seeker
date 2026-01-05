import { useState } from "react";
import { hashImage, hashToScore } from "@/utils/imageHash";

export interface AnalysisResult {
  isDeepfake: boolean;
  confidence: number;
  reasons: string[];
  tips: string[];
}

const analysisCache = new Map<string, AnalysisResult>();

export const useDeepfakeAnalysis = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const analyzeImage = async (file: File) => {
    setIsAnalyzing(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://localhost:8000/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || "Analysis failed");
      }

      const data = await response.json();

      // Transform API result to UI format
      const analysisResult: AnalysisResult = {
        isDeepfake: data.is_deepfake,
        confidence: Math.round(data.confidence),
        reasons: data.explanation || ["Analysis completed successfully"],
        tips: [
          "Verify from multiple trusted sources",
          "Be cautious before sharing",
          "Check for original context",
        ],
      };

      setResult(analysisResult);
    } catch (error) {
      console.error("Analysis Error:", error);
      // Fallback or Error State? For now, we show a basic error reason if possible in UI, 
      // but the UI expects a Result object.
      // Let's create an error result
      const errorResult: AnalysisResult = {
        isDeepfake: false,
        confidence: 0,
        reasons: ["Error connecting to AI server. Make sure server.py is running."],
        tips: ["Check console logs", "Ensure backend is running on port 8000"],
      };
      setResult(errorResult);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => setResult(null);

  return { analyzeImage, isAnalyzing, result, reset };
};
