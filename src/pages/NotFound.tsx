import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center">
      <h1 className="text-6xl font-bold text-foreground mb-4">
        404
      </h1>

      <p className="text-lg text-muted-foreground mb-6">
        Oops! The page you’re looking for doesn’t exist.
      </p>

      <div className="flex gap-4">
        <Button asChild>
          <Link to="/">Go Home</Link>
        </Button>

        <Button variant="outline" asChild>
          <Link to="/login">Login</Link>
        </Button>
      </div>
    </div>
  );
}
