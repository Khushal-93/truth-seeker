import { useEffect, useState } from "react";
import { sendEmailVerification, signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

export default function VerifyEmail() {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  const handleResend = async () => {
    if (!auth.currentUser) return;
    setSending(true);
    try {
      await sendEmailVerification(auth.currentUser);
      toast({ title: "Verification sent", description: "Check your inbox for a verification link." });
    } catch (err: any) {
      toast({ title: "Error", description: err?.message || "Could not send verification.", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err: any) {
      toast({ title: "Error", description: err?.message || "Could not sign out.", variant: "destructive" });
    }
  };

  if (loading) return <div className="flex h-screen items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="max-w-md w-full px-6 py-8 rounded-2xl border border-border bg-card shadow-lg text-center">
        <h2 className="text-xl font-semibold mb-2">Verify Your Email</h2>
        <p className="text-sm text-muted-foreground mb-4">
          We sent a verification link to <strong>{user?.email}</strong>. Please click the link in your email to
          verify your account.
        </p>

        <div className="flex gap-3 justify-center">
          <Button onClick={handleResend} disabled={sending}>{sending ? "Sending..." : "Resend Email"}</Button>
          <Button variant="outline" onClick={handleSignOut}>Sign Out</Button>
        </div>

        <p className="text-xs text-muted-foreground mt-4">After verification, return here or try signing in again.</p>
      </div>
    </div>
  );
}
