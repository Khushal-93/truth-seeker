import { Shield, Eye, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden pt-20">
      {/* Background glow effects */}
      <div className="absolute inset-0 bg-glow opacity-40" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/6 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1.5s" }} />
      
      <div className="relative z-10 max-w-5xl mx-auto text-center py-20">
        {/* Floating icon */}
        <div className="mb-12 flex justify-center">
          <div className="relative">
            <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center animate-float border border-primary/20 shadow-xl shadow-primary/10">
              <Shield className="w-14 h-14 text-primary" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center animate-pulse border border-destructive/30">
              <AlertTriangle className="w-4 h-4 text-destructive" />
            </div>
          </div>
        </div>
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-8 animate-fade-in leading-tight">
          <span className="text-foreground">Detect </span>
          <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">Deepfakes</span>
          <br />
          <span className="text-foreground">Protect </span>
          <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">Truth</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in leading-relaxed" style={{ animationDelay: "0.2s" }}>
          Upload any image and our AI will analyze it for signs of manipulation. 
          Get a confidence score and protect yourself from misinformation.
        </p>
        
        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-border shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200 ease-in-out">
            <Eye className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">AI-Powered Detection</span>
          </div>
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-border shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200 ease-in-out">
            <Shield className="w-4 h-4 text-success" />
            <span className="text-sm font-medium text-foreground">Instant Results</span>
          </div>
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-border shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200 ease-in-out">
            <AlertTriangle className="w-4 h-4 text-warning" />
            <span className="text-sm font-medium text-foreground">Confidence Score</span>
          </div>
        </div>
        
        <Button 
          variant="hero" 
          size="xl" 
          onClick={onGetStarted}
          className="animate-fade-in transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-xl hover:shadow-primary/30"
          style={{ animationDelay: "0.4s" }}
        >
          Analyze an Image
        </Button>
        
        {/* Simple explanation for kids */}
        <div className="mt-20 p-8 rounded-2xl bg-white border border-border shadow-xl max-w-2xl mx-auto animate-fade-in hover:shadow-2xl transition-all duration-200 ease-in-out" style={{ animationDelay: "0.5s" }}>
          <h3 className="text-xl font-display font-semibold text-foreground mb-3">
            🤔 What is a Deepfake?
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Imagine if someone could put your face on a video of someone else doing something you never did. 
            That's a deepfake! It's like a super-powered photo edit that can make fake videos look real. 
            Our tool helps you spot these fakes so you don't get tricked!
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
