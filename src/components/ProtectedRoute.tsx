import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

type Props = {
  children: JSX.Element;
};

export default function ProtectedRoute({ children }: Props) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user exists but hasn't verified their email, route them to verification prompt
  if (user && !user.emailVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
}
