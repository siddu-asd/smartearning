"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hoverEffect?: boolean;
}

export function GlassCard({
  children,
  className,
  delay = 0,
  hoverEffect = true,
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      whileHover={
        hoverEffect
          ? {
              y: -10,
              transition: { duration: 0.3 },
            }
          : undefined
      }
      className={cn(
        "glass rounded-2xl p-6 relative overflow-hidden group",
        hoverEffect && "hover:border-primary/50 transition-colors duration-300",
        className
      )}
    >
      {/* Subtle background glow effect on hover */}
      {hoverEffect && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      )}
      
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
