import { useRef, useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ImageUploader from "@/components/ImageUploader";
import AnalysisResult from "@/components/AnalysisResult";
import EducationSection from "@/components/EducationSection";
import { useDeepfakeAnalysis } from "@/hooks/useDeepfakeAnalysis";
import { Button } from "@/components/ui/button";

export default function Index() {
  const analyzerRef = useRef<HTMLDivElement>(null);
  const { analyzeImage, isAnalyzing, result, reset } =
    useDeepfakeAnalysis();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const scrollToAnalyzer = () =>
    analyzerRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <HeroSection onGetStarted={scrollToAnalyzer} />

        {/* Analyzer */}
        <section ref={analyzerRef} className="py-20 px-4">
          <ImageUploader
            isAnalyzing={isAnalyzing}
            onImageSelect={(file) => {
              setSelectedFile(file);
              reset();
            }}
          />

          {selectedFile && (
            <div className="flex justify-center items-center gap-3 mt-6">
              <Button
                onClick={() => analyzeImage(selectedFile)}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? "Analyzing..." : "Analyze Image"}
              </Button>

              {result && (
                <Button variant="outline" onClick={reset}>
                  Analyze Another
                </Button>
              )}
            </div>
          )}

          {result && (
            <div className="mt-8">
              <AnalysisResult result={result} />
            </div>
          )}
        </section>

        <EducationSection />
      </main>
    </div>
  );
}
