import { useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import TopBanner from "@/components/TopBanner";
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
      toast({
        title: "Missing fields",
        description: "Please enter email and password.",
        variant: "destructive",
      });
      return false;
    }

    const emailRe = /^\S+@\S+\.\S+$/;
    if (!emailRe.test(email)) {
      toast({
        title: "Invalid email",
        description: "Enter a valid email address.",
        variant: "destructive",
      });
      return false;
    }

    if (password.length < 6) {
      toast({
        title: "Weak password",
        description: "Password must be at least 6 characters.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleLogin = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    try {
      const cred = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const signedInUser = cred.user;

      if (!signedInUser.emailVerified) {
        try {
          await sendEmailVerification(signedInUser);
        } catch {}

        toast({
          title: "Email not verified",
          description:
            "Verification email sent. Please verify your email.",
          variant: "destructive",
        });

        navigate("/verify-email");
        return;
      }

      toast({
        title: "Signed in",
        description: "Welcome back!",
      });

      navigate("/analyze");
    } catch (error: any) {
      toast({
        title: "Sign-in failed",
        description: error?.message || "Unable to sign in.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <TopBanner />

      <div className="flex-1 flex items-center justify-center w-full px-4 py-12">
        <div className="max-w-md w-full px-8 py-10 rounded-2xl border border-border bg-white shadow-xl hover:shadow-2xl transition-all duration-200 ease-in-out">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
              Welcome Back
            </h1>
            <p className="text-muted-foreground font-medium">
              Sign in to analyze images and view your results.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleLogin}>
            <label className="block">
              <span className="text-sm font-semibold text-foreground mb-2 block">
                Email
              </span>
              <input
                className="mt-1 block w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 ease-in-out"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-foreground mb-2 block">
                Password
              </span>
              <input
                className="mt-1 block w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 ease-in-out"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <Button
              type="submit"
              className="w-full mt-6 h-12 text-base font-semibold hover:scale-[1.02] transition-all duration-200 ease-in-out"
              disabled={submitting}
            >
              {submitting ? "Signing in..." : "Login"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-primary font-semibold hover:underline transition-all duration-200 ease-in-out"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
