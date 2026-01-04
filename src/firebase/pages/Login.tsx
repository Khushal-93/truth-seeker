import { useEffect, useState } from "react";
import { signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && user) {
      navigate("/analyze");
    }
  }, [user, loading, navigate]);

  const validate = () => {
    if (!email || !password) {
      toast({ title: "Missing fields", description: "Please enter email and password.", variant: "destructive" });
      return false;
    }
    const emailRe = /^\S+@\S+\.\S+$/;
    if (!emailRe.test(email)) {
      toast({ title: "Invalid email", description: "Enter a valid email address.", variant: "destructive" });
      return false;
    }
    if (password.length < 6) {
      toast({ title: "Weak password", description: "Password must be at least 6 characters.", variant: "destructive" });
      return false;
    }
    return true;
  };

  const handleLogin = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const signedInUser = cred.user;
      if (!signedInUser.emailVerified) {
        try {
          await sendEmailVerification(signedInUser);
        } catch {}
        toast({ title: "Email not verified", description: "Verification email sent. Please verify your email.", variant: "destructive" });
        navigate("/verify-email");
        setSubmitting(false);
        return;
      }
      toast({ title: "Signed in", description: "Welcome back!", variant: "default" });
      navigate("/analyze");
    } catch (error: any) {
      toast({ title: "Sign-in failed", description: error?.message || "Unable to sign in.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="max-w-md w-full px-6 py-8 rounded-2xl border border-border bg-card shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Welcome Back</h1>
          <p className="text-sm text-muted-foreground">Sign in to analyze images and view your results.</p>
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
          <label className="block">
            <span className="text-sm text-muted-foreground">Email</span>
            <input
              className="mt-1 block w-full rounded-md border border-border bg-transparent px-3 py-2 focus:outline-none focus:border-primary"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-sm text-muted-foreground">Password</span>
            <input
              className="mt-1 block w-full rounded-md border border-border bg-transparent px-3 py-2 focus:outline-none focus:border-primary"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Signing in..." : "Login"}
          </Button>
        </form>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          Don't have an account? <Link to="/register" className="text-primary hover:underline">Register</Link>
        </div>
      </div>
    </div>
  );
}
