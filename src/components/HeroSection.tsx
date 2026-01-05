import { Shield, Eye, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 bg-glow opacity-50" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1.5s" }} />
      {/* Subtle scanline overlay for gentle glitchy sheen */}
      <div aria-hidden className="absolute inset-0 pointer-events-none scanline opacity-20 mix-blend-overlay" />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Floating icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center animate-float border border-primary/30">
              <Shield className="w-12 h-12 text-primary" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center animate-pulse">
              <AlertTriangle className="w-4 h-4 text-destructive" />
            </div>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 animate-fade-in">
          <span className="text-foreground">Detect </span>
          <span className="text-gradient glitch" data-text="Deepfakes">Deepfakes</span>
          <br />
          <span className="text-foreground">Protect </span>
          <span className="text-gradient glitch" data-text="Truth">Truth</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          Upload any image and our AI will analyze it for signs of manipulation. 
          Get a confidence score and protect yourself from misinformation.
        </p>
        
        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-10 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border">
            <Eye className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">AI-Powered Detection</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border">
            <Shield className="w-4 h-4 text-success" />
            <span className="text-sm text-muted-foreground">Instant Results</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border">
            <AlertTriangle className="w-4 h-4 text-warning" />
            <span className="text-sm text-muted-foreground">Confidence Score</span>
          </div>
        </div>
        
        <Button 
          variant="hero" 
          size="xl" 
          onClick={onGetStarted}
          className="animate-fade-in glitch-cta smooth"
          style={{ animationDelay: "0.4s" }}
        >
          Analyze an Image
        </Button>
        
        {/* Simple explanation for kids */}
        <div className="mt-16 p-6 rounded-2xl card-gradient border border-border max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <h3 className="text-lg font-display font-semibold text-foreground mb-3">
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
