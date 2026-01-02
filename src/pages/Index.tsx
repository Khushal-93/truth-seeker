import { useRef, useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ImageUploader from "@/components/ImageUploader";
import AnalysisResult from "@/components/AnalysisResult";
import EducationSection from "@/components/EducationSection";
import { useDeepfakeAnalysis } from "@/hooks/useDeepfakeAnalysis";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw } from "lucide-react";

const Index = () => {
  const analyzerRef = useRef<HTMLDivElement>(null);
  const { analyzeImage, isAnalyzing, result, reset } = useDeepfakeAnalysis();
  const [hasImage, setHasImage] = useState(false);

  const scrollToAnalyzer = () => {
    analyzerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleImageSelect = (imageData: string) => {
    setHasImage(true);
    analyzeImage(imageData);
  };

  const handleReset = () => {
    reset();
    setHasImage(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <HeroSection onGetStarted={scrollToAnalyzer} />
        
        {/* Analyzer Section */}
        <section 
          ref={analyzerRef} 
          id="detect"
          className="py-20 px-4 relative"
        >
          <div className="absolute inset-0 bg-glow opacity-30" />
          
          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Analyze Your <span className="text-gradient">Image</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Upload an image and our AI will scan it for signs of manipulation.
                Results are instant and include a detailed breakdown.
              </p>
            </div>

            {result && (
              <div className="flex justify-center gap-3 mb-8">
                <Button variant="outline" onClick={handleReset}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Analyze Another
                </Button>
                <Button variant="secondary" onClick={() => analyzeImage("")}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Re-analyze
                </Button>
              </div>
            )}

            {!result && <ImageUploader onImageSelect={handleImageSelect} isAnalyzing={isAnalyzing} />}
            
            {result && <AnalysisResult result={result} />}
          </div>
        </section>

        {/* Education Section */}
        <div id="learn">
          <EducationSection />
        </div>

        {/* About Section */}
        <section id="about" className="py-20 px-4 border-t border-border">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">
              Why This Matters
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Deepfakes can be used to spread lies, hurt people's feelings, or even trick 
              people into believing things that aren't true. By learning to spot them, 
              you become a superhero who helps protect truth on the internet!
            </p>
            <p className="text-sm text-muted-foreground">
              This tool is for educational purposes. Always use critical thinking and 
              verify information from multiple sources.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 border-t border-border bg-card/50">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2026 DeepGuard. Protecting truth in the digital age.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
