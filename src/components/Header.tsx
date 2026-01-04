import { Shield } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
      try {
      await signOut(auth);
      toast({ title: "Signed out", description: "You have been signed out.", variant: "default" });
      navigate("/login");
    } catch (err: any) {
      toast({ title: "Sign out failed", description: err?.message || "Could not sign out.", variant: "destructive" });
    }
  };
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
          {user ? (
            <button
              onClick={handleLogout}
              className="text-sm bg-transparent border border-border px-3 py-1 rounded-md hover:bg-muted"
            >
              Logout
            </button>
          ) : (
            <a href="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Login
            </a>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
