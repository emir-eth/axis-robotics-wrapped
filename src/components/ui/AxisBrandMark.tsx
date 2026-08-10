"use client";

import { cn } from "@/lib/utils";
import "@/components/intro/preloader.css";

interface AxisBrandMarkProps {
  size?: "preloader" | "header";
  className?: string;
  onClick?: () => void;
}

export function AxisBrandMark({
  size = "preloader",
  className,
  onClick,
}: AxisBrandMarkProps) {
  const content = (
    <>
      <div className="axis-brand-mark__logo-wrap">
        <div className="axis-logo-scene" aria-hidden="true">
          <div className="axis-logo-spin">
            <div className="axis-logo-stack">
              <img
                src="/axis-symbol-logo.svg"
                alt=""
                width={152}
                height={152}
                decoding="async"
              />
              <img
                src="/axis-symbol-logo.svg"
                alt=""
                width={152}
                height={152}
                decoding="async"
              />
              <img
                src="/axis-symbol-logo.svg"
                alt=""
                width={152}
                height={152}
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="axis-brand-mark__wordmark" aria-hidden>
        <span className="axis-brand-mark__wordmark-line">AXIS</span>
        <span className="axis-brand-mark__wordmark-line">ROBOTICS</span>
      </div>
      <span className="sr-only">Axis Robotics</span>
    </>
  );

  const classes = cn(
    "axis-brand-mark",
    size === "header" && "axis-brand-mark--header",
    onClick && "cursor-pointer",
    className,
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={classes}
        aria-label="Go to profile stats"
      >
        {content}
      </button>
    );
  }

  return <div className={classes}>{content}</div>;
}
