import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center">
      <h1 className="text-7xl md:text-8xl font-display font-bold text-foreground mb-6">
        404
      </h1>

      <p className="text-xl text-muted-foreground mb-8 font-medium">
        Oops! The page you're looking for doesn't exist.
      </p>

      <div className="flex gap-4">
        <Button asChild className="h-12 px-8 font-semibold hover:scale-105 transition-all duration-200 ease-in-out">
          <Link to="/">Go Home</Link>
        </Button>

        <Button variant="outline" asChild className="h-12 px-8 font-semibold hover:scale-105 transition-all duration-200 ease-in-out">
          <Link to="/login">Login</Link>
        </Button>
      </div>
    </div>
  );
}
