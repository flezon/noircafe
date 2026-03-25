"use client";

import { motion, useScroll } from "framer-motion";
import { ReactNode } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface NarrativeSectionProps {
  children: ReactNode;
  align?: "left" | "right" | "center";
}

export default function NarrativeSection({ 
  children, 
  align = "center" 
}: NarrativeSectionProps) {
  useScroll({
    offset: ["start end", "end start"]
  });

  // Fade and slide logic based on the range (this is tricky because useScroll is relative to this element)
  // Instead, we use a global scroll tracking or map it in the parent.
  // For simplicity here, we'll use a fixed position approach in the main page.
  
  return (
    <div className={cn(
      "min-h-screen w-full flex items-center px-6 md:px-24",
      align === "center" ? "justify-center text-center" : 
      align === "right" ? "justify-end text-right" : "justify-start text-left"
    )}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ margin: "-20% 0px -20% 0px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl"
      >
        {children}
      </motion.div>
    </div>
  );
}
