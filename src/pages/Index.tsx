import { useRef, useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ImageUploader from "@/components/ImageUploader";
import AnalysisResult from "@/components/AnalysisResult";
import EducationSection from "@/components/EducationSection";
import { useDeepfakeAnalysis } from "@/hooks/useDeepfakeAnalysis";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw } from "lucide-react";

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
            <div className="flex justify-center gap-3 mt-6">
              <Button
                onClick={() => analyzeImage(selectedFile)}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? "Analyzing..." : "Analyze Image"}
              </Button>

              {result && (
                <Button
                  variant="secondary"
                  onClick={() => analyzeImage(selectedFile)}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Re‑analyze
                </Button>
              )}

              {result && (
                <Button variant="outline" onClick={reset}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Analyze Another
                </Button>
              )}
            </div>
          )}

          {result && <AnalysisResult result={result} />}
        </section>

        <EducationSection />
      </main>
    </div>
  );
}
