import React from "react";

export default function TopBanner() {
  return (
    <div className="w-full bg-[#f5f5f7] text-[#1d1d1f] text-sm">
      <div className="mx-auto max-w-7xl px-4 py-2 text-center">
        <span className="font-medium">
          Support DeepGuard — help fund educational resources to detect manipulated media.
        </span>{" "}
        <a
          href="#"
          className="underline hover:no-underline"
          aria-label="DeepGuard donation link"
        >
          Learn more
        </a>
      </div>
    </div>
  );
}
