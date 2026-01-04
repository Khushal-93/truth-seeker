import { useState } from "react";

interface AnalysisResult {
  isDeepfake: boolean;
  confidence: number;
  reasons: string[];
  tips: string[];
}

// Simulated AI analysis - in production, this would call a real ML model
export const useDeepfakeAnalysis = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const analyzeImage = async (imageData: string): Promise<void> => {
    setIsAnalyzing(true);
    setResult(null);

    // Simulate AI processing time
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // For demo purposes, generate deterministic analysis from the image data
    // In a real app, this would send the image to an AI model
    const hashString = (str: string) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0;
      }
      return Math.abs(hash);
    };

    const hash = hashString(imageData);

    const isDeepfake = hash % 2 === 0;

    const confidence = isDeepfake
      ? 60 + (hash % 30) // 60–89
      : 10 + (hash % 30); // 10–39

    const deepfakeReasons = [
      "Inconsistent lighting detected around facial features",
      "Unnatural eye movement patterns identified",
      "Blending artifacts found at face boundaries",
      "Temporal inconsistencies in pixel patterns",
      "Unusual skin texture smoothness detected",
    ];

    const authenticReasons = [
      "Consistent lighting across all facial features",
      "Natural eye reflections and movements",
      "No visible blending or morphing artifacts",
      "Pixel patterns match natural photography",
      "Skin texture appears natural and unedited",
    ];

    const tips = [
      "Always verify images from multiple trusted sources",
      "Look for unnatural movements in videos",
      "Check if the person's lips sync with their words",
      "Be extra careful with sensational content",
      "When in doubt, don't share!",
    ];

    const reasonCount = 3 + (hash % 2);

    const selectedReasons = isDeepfake
      ? deepfakeReasons.slice(0, reasonCount)
      : authenticReasons.slice(0, reasonCount);

    setResult({
      isDeepfake,
      confidence,
      reasons: selectedReasons,
      tips,
    });

    setIsAnalyzing(false);
  };

  const reset = () => {
    setResult(null);
  };

  return {
    analyzeImage,
    isAnalyzing,
    result,
    reset,
  };
};
