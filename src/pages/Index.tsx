import { useRef, useState } from "react";
import Header from "@/components/Header";
import TopBanner from "@/components/TopBanner";
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
      <TopBanner />
      <Header />

      <main>
        <HeroSection onGetStarted={scrollToAnalyzer} />

        {/* Analyzer */}
        <section ref={analyzerRef} className="py-24 px-4">
          <ImageUploader
            isAnalyzing={isAnalyzing}
            onImageSelect={(file) => {
              setSelectedFile(file);
              reset();
            }}
          />

          {selectedFile && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <Button
                onClick={() => analyzeImage(selectedFile)}
                disabled={isAnalyzing}
                className="h-12 px-8 text-base font-semibold hover:scale-105 transition-all duration-200 ease-in-out"
              >
                {isAnalyzing ? "Analyzing..." : "Analyze Media"}
              </Button>

              {result && (
                <Button
                  variant="outline"
                  onClick={reset}
                  className="h-12 px-8 text-base font-semibold hover:scale-105 transition-all duration-200 ease-in-out"
                >
                  Analyze Another
                </Button>
              )}
            </div>
          )}

          {result && (
            <div className="mt-12">
              <AnalysisResult result={result} />
            </div>
          )}
        </section>

        <EducationSection />
      </main>
    </div>
  );
}
