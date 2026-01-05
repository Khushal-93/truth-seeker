import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Initialize theme before React renders to prevent flash
function initializeTheme() {
  const root = document.documentElement;
  
  // Check localStorage first
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") {
    root.classList.add(stored);
    root.setAttribute("data-theme", stored);
    return;
  }
  
  // Fall back to system preference
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    root.classList.add("dark");
    root.setAttribute("data-theme", "dark");
  } else {
    root.classList.add("light");
    root.setAttribute("data-theme", "light");
  }
}

// Initialize theme immediately
initializeTheme();

createRoot(document.getElementById("root")!).render(<App />);
