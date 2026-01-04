import { useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import TopBanner from "@/components/TopBanner";
import { useToast } from "@/hooks/use-toast";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRegister = async () => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      try {
        await sendEmailVerification(cred.user);
      } catch {}
      toast({ title: "Verify email", description: "Verification sent. Check your inbox." });
      navigate("/analyze");
    } catch (error: any) {
      toast({ title: "Registration failed", description: error?.message || "Could not create account.", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <TopBanner />
      <div className="flex-1 flex items-center justify-center w-full">
        <div className="max-w-md w-full px-6 py-8 rounded-2xl border border-border bg-card shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Create Account</h1>
          <p className="text-sm text-muted-foreground">Sign up to start analyzing images.</p>
        </div>

        <div className="space-y-4">
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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <Button onClick={handleRegister} className="w-full">Register</Button>
        </div>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account? <Link to="/login" className="text-primary hover:underline">Login</Link>
        </div>
      </div>
    </div>
  );
}
