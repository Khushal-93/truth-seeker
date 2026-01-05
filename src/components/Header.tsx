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
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/20">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display font-semibold text-xl text-foreground tracking-tight">
            DeepGuard
          </span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#detect" className="text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-200 ease-in-out hover:scale-105">
            Detect
          </a>
          <a href="#learn" className="text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-200 ease-in-out hover:scale-105">
            Learn
          </a>
          <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-200 ease-in-out hover:scale-105">
            About
          </a>
          {user ? (
            <button
              onClick={handleLogout}
              className="text-sm font-medium bg-transparent border border-border px-4 py-2 rounded-lg hover:bg-muted hover:border-primary/50 transition-all duration-200 ease-in-out hover:scale-105"
            >
              Logout
            </button>
          ) : (
            <a href="/login" className="text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-200 ease-in-out hover:scale-105">
              Login
            </a>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
