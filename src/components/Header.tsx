import { Shield } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-xl text-foreground">
            DeepGuard
          </span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="#detect" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Detect
          </a>
          <a href="#learn" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Learn
          </a>
          <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            About
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
