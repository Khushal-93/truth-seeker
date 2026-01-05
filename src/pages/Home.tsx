import { Link } from "react-router-dom";
import { Shield, Mail, HelpCircle, Users, Upload, Brain, ShieldCheck, Lock, Zap, BarChart3, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import TopBanner from "@/components/TopBanner";
import { useTheme } from "@/hooks/useTheme";

const Home = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      <TopBanner />
      {/* Sticky Header with Blur */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-card/80 dark:bg-card/90 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 dark:from-primary dark:to-primary/90 flex items-center justify-center shadow-lg shadow-primary/20">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-semibold text-xl text-foreground tracking-[-0.02em]">DeepGuard</span>
          </div>

          <nav className="flex items-center gap-4">
            <Link 
              to="/login" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 ease-out relative group"
            >
              Login
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 ease-out"></span>
            </Link>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-secondary transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
              ) : (
                <Sun className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
              )}
            </button>
            <Link to="/register">
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-primary to-primary/80 dark:from-primary dark:to-primary/90 text-primary-foreground border-0 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 hover:scale-105 transition-all duration-300 ease-out font-semibold"
              >
                Sign Up
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="px-4">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center py-20 md:py-32">
          {/* Left Side - Headline & CTAs */}
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-foreground mb-6 leading-[1.1] tracking-[-0.02em]">
              <span className="block">Protect Truth with</span>
              <span className="block bg-gradient-to-r from-primary via-primary/90 to-primary/70 dark:from-primary dark:via-primary/90 dark:to-primary/80 bg-clip-text text-transparent">
                DeepGuard
              </span>
            </h1>
            <p className="text-muted-foreground max-w-xl mb-10 text-lg md:text-xl leading-relaxed font-normal">
              DeepGuard helps you identify manipulated images using AI-powered analysis. Upload an image and get
              a clear, easy-to-understand breakdown of whether it might be a deepfake.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link to="/analyze">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-primary/80 dark:from-primary dark:to-primary/90 text-primary-foreground border-0 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:scale-105 transition-all duration-300 ease-out font-semibold text-base px-8 py-6 h-auto rounded-xl"
                >
                  Analyze Image
                </Button>
              </Link>
              <a 
                href="#how-it-works" 
                className="text-base font-medium text-muted-foreground hover:text-foreground transition-all duration-300 ease-out px-4 py-6"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Right Side - Floating Glass Card */}
          <div className="hidden md:flex items-center justify-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="w-full max-w-lg rounded-2xl bg-card/80 dark:bg-card/90 backdrop-blur-sm border border-border p-8 shadow-xl shadow-primary/10 hover:shadow-2xl hover:shadow-primary/15 hover:-translate-y-1 transition-all duration-300 ease-out">
              <img 
                alt="hero" 
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder" 
                className="w-full h-64 object-cover rounded-xl mb-6" 
              />
              <div>
                <h3 className="text-2xl font-display font-semibold text-foreground mb-3">How it works</h3>
                <p className="text-muted-foreground leading-relaxed">Our model analyzes lighting, edges, and inconsistencies to flag possible manipulations.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section id="how-it-works" className="max-w-7xl mx-auto py-20 md:py-32 bg-card">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4 tracking-[-0.02em]">
              How it works
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Three simple steps to detect deepfakes with AI-powered precision
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            {/* Step 1 */}
            <div className="p-8 rounded-2xl border border-border bg-card shadow-lg hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 ease-out group backdrop-blur-sm">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/80 dark:from-primary dark:to-primary/90 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ease-out shadow-lg shadow-primary/20">
                <Upload className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-display font-bold text-foreground mb-3">Upload Image</h3>
              <p className="text-muted-foreground leading-relaxed">
                Simply drag and drop or select an image file. We support all common image formats.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-8 rounded-2xl border border-border bg-card shadow-lg hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 ease-out group backdrop-blur-sm">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/80 dark:from-primary dark:to-primary/90 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ease-out shadow-lg shadow-primary/20">
                <Brain className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-display font-bold text-foreground mb-3">AI Analysis</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our advanced AI model analyzes lighting, edges, and pixel inconsistencies to detect manipulation.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-8 rounded-2xl border border-border bg-card shadow-lg hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 ease-out group backdrop-blur-sm">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/80 dark:from-primary dark:to-primary/90 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ease-out shadow-lg shadow-primary/20">
                <BarChart3 className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-display font-bold text-foreground mb-3">Confidence Score</h3>
              <p className="text-muted-foreground leading-relaxed">
                Get an instant confidence score with detailed explanations of what our AI detected.
              </p>
            </div>
          </div>
        </section>

        {/* Trust & Credibility Section */}
        <section className="max-w-7xl mx-auto py-20 md:py-32 bg-background">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4 tracking-[-0.02em]">
              Trusted AI-powered Deepfake Detection
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Built with cutting-edge technology to protect truth and combat misinformation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
            <div className="p-6 rounded-xl bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300 ease-out">
              <div className="w-12 h-12 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-lg font-display font-semibold text-foreground mb-2">95%+ Accuracy</h4>
              <p className="text-sm text-muted-foreground">Industry-leading detection rates powered by advanced AI models</p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300 ease-out">
              <div className="w-12 h-12 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-lg font-display font-semibold text-foreground mb-2">AI-Powered Analysis</h4>
              <p className="text-sm text-muted-foreground">State-of-the-art deep learning algorithms analyze every detail</p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300 ease-out">
              <div className="w-12 h-12 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-lg font-display font-semibold text-foreground mb-2">Privacy-First</h4>
              <p className="text-sm text-muted-foreground">Your images are processed securely and never stored on our servers</p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300 ease-out">
              <div className="w-12 h-12 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-lg font-display font-semibold text-foreground mb-2">No Data Stored</h4>
              <p className="text-sm text-muted-foreground">Images are analyzed in real-time and immediately discarded</p>
            </div>
          </div>
        </section>

        {/* Why it Matters Section */}
        <section id="learn" className="max-w-7xl mx-auto py-20 md:py-32 bg-card">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            <div className="p-8 rounded-2xl border border-border bg-card shadow-lg hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 ease-out">
              <Users className="w-10 h-10 text-primary mb-5" />
              <h4 className="text-xl font-display font-semibold text-foreground mb-3">Why it matters</h4>
              <p className="text-muted-foreground leading-relaxed">Deepfakes can spread misinformation. Learning to spot them protects communities and individuals.</p>
            </div>

            <div className="p-8 rounded-2xl border border-border bg-card shadow-lg hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 ease-out">
              <HelpCircle className="w-10 h-10 text-primary mb-5" />
              <h4 className="text-xl font-display font-semibold text-foreground mb-3">How we analyze</h4>
              <p className="text-muted-foreground leading-relaxed">We inspect pixels, edges and lighting consistency to surface suspicious artifacts and provide a confidence score.</p>
            </div>

            <div className="p-8 rounded-2xl border border-border bg-card shadow-lg hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 ease-out">
              <Mail className="w-10 h-10 text-primary mb-5" />
              <h4 className="text-xl font-display font-semibold text-foreground mb-3">Help & Support</h4>
              <p className="text-muted-foreground leading-relaxed">Questions? Reach us at <a href="mailto:support@deepguard.example" className="text-primary font-semibold hover:underline">support@deepguard.example</a></p>
            </div>
          </div>
        </section>

        {/* What is a Deepfake Section */}
        <section className="max-w-4xl mx-auto py-20 md:py-32 px-4 bg-card">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6 tracking-[-0.02em]">
              What is a deepfake?
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg md:text-xl max-w-3xl mx-auto">
              Deepfakes are synthetic media where a person's likeness or voice is digitally altered. They can be used maliciously to spread misinformation.
              DeepGuard is an educational tool to help you detect and understand manipulated images.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
