import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import TopBanner from "@/components/TopBanner";
import { useToast } from "@/hooks/use-toast";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRegister = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!email || !password) {
      toast({
        title: "Missing fields",
        description: "Please enter email and password.",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Weak password",
        description: "Password must be at least 6 characters.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    try {
      const cred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      try {
        await sendEmailVerification(cred.user);
      } catch {}

      toast({
        title: "Verify your email",
        description:
          "Verification email sent. Please check your inbox.",
      });

      navigate("/verify-email");
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description:
          error?.message || "Could not create account.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <TopBanner />

      <div className="flex-1 flex items-center justify-center w-full px-4 py-12">
        <div className="max-w-md w-full px-8 py-10 rounded-2xl border border-border bg-white shadow-xl hover:shadow-2xl transition-all duration-200 ease-in-out">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
              Create Account
            </h1>
            <p className="text-muted-foreground font-medium">
              Sign up to start analyzing images.
            </p>
          </div>

          <form
            className="space-y-5"
            onSubmit={handleRegister}
          >
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
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <Button
              type="submit"
              className="w-full mt-6 h-12 text-base font-semibold hover:scale-[1.02] transition-all duration-200 ease-in-out"
              disabled={submitting}
            >
              {submitting ? "Creating account..." : "Register"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-semibold hover:underline transition-all duration-200 ease-in-out"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
