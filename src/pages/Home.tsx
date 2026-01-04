import { Link } from "react-router-dom";
import { Shield, Mail, HelpCircle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
            <Shield className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-2xl text-foreground">DeepGuard</span>
        </div>

        <nav className="flex items-center gap-3">
          <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground">Login</Link>
          <Link to="/register">
            <Button variant="outline" size="sm">Sign Up</Button>
          </Link>
        </nav>
      </header>

      <main className="px-4">
        <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center py-20">
          <div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              Protect Truth with <span className="text-gradient">DeepGuard</span>
            </h1>
            <p className="text-muted-foreground max-w-lg mb-6">
              DeepGuard helps you identify manipulated images using AI-powered analysis. Upload an image and get
              a clear, easy-to-understand breakdown of whether it might be a deepfake.
            </p>

            <div className="flex items-center gap-3">
              <Link to="/analyze">
                <Button variant="hero" size="lg">Analyze Image</Button>
              </Link>
              <a href="#learn" className="text-sm text-muted-foreground hover:text-foreground">Learn more</a>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-center">
            <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-lg">
              <img alt="hero" src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder" className="w-full h-56 object-cover rounded-md" />
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-foreground">How it works</h3>
                <p className="text-sm text-muted-foreground mt-2">Our model analyzes lighting, edges, and inconsistencies to flag possible manipulations.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="learn" className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
          <div className="p-6 rounded-2xl border border-border bg-card">
            <Users className="w-6 h-6 text-primary mb-3" />
            <h4 className="font-semibold text-foreground mb-2">Why it matters</h4>
            <p className="text-sm text-muted-foreground">Deepfakes can spread misinformation. Learning to spot them protects communities and individuals.</p>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-card">
            <HelpCircle className="w-6 h-6 text-primary mb-3" />
            <h4 className="font-semibold text-foreground mb-2">How we analyze</h4>
            <p className="text-sm text-muted-foreground">We inspect pixels, edges and lighting consistency to surface suspicious artifacts and provide a confidence score.</p>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-card">
            <Mail className="w-6 h-6 text-primary mb-3" />
            <h4 className="font-semibold text-foreground mb-2">Help & Support</h4>
            <p className="text-sm text-muted-foreground">Questions? Reach us at <a href="mailto:support@deepguard.example" className="text-primary">support@deepguard.example</a></p>
          </div>
        </section>

        <section className="max-w-4xl mx-auto py-12">
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">What is a deepfake?</h2>
          <p className="text-muted-foreground leading-relaxed">
            Deepfakes are synthetic media where a person's likeness or voice is digitally altered. They can be used maliciously to spread misinformation.
            DeepGuard is an educational tool to help you detect and understand manipulated images.
          </p>
        </section>
      </main>
    </div>
  );
};

export default Home;
