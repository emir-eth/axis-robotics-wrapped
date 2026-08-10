"use client";

import { XLogo } from "@/components/ui/XLogo";
import { cn } from "@/lib/utils";

interface CreatorFooterProps {
  className?: string;
}

export function CreatorFooter({ className }: CreatorFooterProps) {
  return (
    <footer
      className={cn(
        "relative z-20 flex items-center justify-center px-5 py-5",
        className,
      )}
    >
      <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-mono text-[13px] tracking-[0.12em] sm:text-sm">
        <span className="text-white">Created by</span>
        <a
          href="https://x.com/emir_ethh"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-axis-fg/75 transition-colors duration-200 hover:text-axis-fg"
          aria-label="emir_ethh on X"
        >
          <XLogo className="h-4 w-4 text-white" />
          <span>@emir_ethh</span>
        </a>
      </p>
    </footer>
  );
}
