import { useEffect, useState } from "react";
import { sendEmailVerification, signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { Button } from "@/components/ui/button";
import TopBanner from "@/components/TopBanner";

export default function VerifyEmail() {
  const user = auth.currentUser;
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const checkVerification = async () => {
      if (!user) return;

      await user.reload();
      if (user.emailVerified) {
        window.location.href = "/";
      } else {
        setLoading(false);
      }
    };

    checkVerification();
  }, [user]);

  const handleResend = async () => {
    if (!user) return;
    setSending(true);
    await sendEmailVerification(user);
    setSending(false);
  };

  const handleSignOut = async () => {
    await signOut(auth);
    window.location.href = "/login";
  };

  // ✅ FIXED JSX RETURN
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

      <div className="flex-1 flex items-center justify-center w-full">
        <div className="max-w-md w-full px-6 py-8 rounded-2xl border bg-card shadow-lg text-center">
          <h2 className="text-xl font-semibold mb-2">
            Verify Your Email
          </h2>

          <p className="text-sm text-muted-foreground mb-4">
            We sent a verification link to{" "}
            <strong>{user?.email}</strong>. Please check your inbox
            and click the link.
          </p>

          <div className="flex gap-3 justify-center">
            <Button onClick={handleResend} disabled={sending}>
              {sending ? "Sending..." : "Resend Email"}
            </Button>

            <Button variant="outline" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>

          <p className="text-xs text-muted-foreground mt-4">
            After verification, return here or sign in again.
          </p>
        </div>
      </div>
    </div>
  );
}
