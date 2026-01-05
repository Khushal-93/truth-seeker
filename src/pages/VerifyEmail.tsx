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

      <div className="flex-1 flex items-center justify-center w-full px-4 py-12">
        <div className="max-w-md w-full px-8 py-10 rounded-2xl border border-border bg-white shadow-xl hover:shadow-2xl transition-all duration-200 ease-in-out text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">
            Verify Your Email
          </h2>

          <p className="text-muted-foreground mb-6 leading-relaxed">
            We sent a verification link to{" "}
            <strong className="text-foreground">{user?.email}</strong>. Please check your inbox
            and click the link.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <Button 
              onClick={handleResend} 
              disabled={sending}
              className="h-11 font-semibold hover:scale-[1.02] transition-all duration-200 ease-in-out"
            >
              {sending ? "Sending..." : "Resend Email"}
            </Button>

            <Button 
              variant="outline" 
              onClick={handleSignOut}
              className="h-11 font-semibold hover:scale-[1.02] transition-all duration-200 ease-in-out"
            >
              Sign Out
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            After verification, return here or sign in again.
          </p>
        </div>
      </div>
    </div>
  );
}
