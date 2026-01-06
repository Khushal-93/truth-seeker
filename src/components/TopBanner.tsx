import React from "react";

export default function TopBanner() {
  return (
    <div className="w-full bg-background border-b border-border text-sm">
      <div className="mx-auto max-w-7xl px-4 py-3 text-center">
        <span className="font-medium text-foreground/80">
          Support DeepGuard — help fund educational resources to detect manipulated media.
        </span>{" "}
        <a
          href="#"
          className="text-primary font-bold hover:underline transition-all duration-200 ease-in-out"
          aria-label="DeepGuard donation link"
        >
          Learn more
        </a>
      </div>
    </div>
  );
}
