"use client";

import { motion } from "framer-motion";
import { type LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change?: number;
  changeLabel?: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  delay?: number;
  size?: "sm" | "md" | "lg";
}

export function StatCard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  iconColor = "text-[var(--color-accent)]",
  iconBg = "bg-[var(--color-accent)]/10",
  delay = 0,
  size = "md",
}: StatCardProps) {
  const isPositive = change !== undefined ? change >= 0 : undefined;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className={cn(
        "relative rounded-2xl p-5 cursor-default overflow-hidden",
        "bg-[var(--surface)] border border-[var(--border)]",
        "hover:border-[var(--color-accent)]/30 hover:shadow-lg transition-all duration-300",
        size === "sm" && "p-4",
        size === "lg" && "p-6"
      )}
    >
      {/* Subtle accent glow */}
      <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-[var(--color-accent)]/5 blur-xl" />

      <div className="relative flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm text-[var(--foreground)]/50 font-medium mb-2">{title}</p>
          <p
            className={cn(
              "font-heading font-bold text-[var(--foreground)] truncate",
              size === "sm" ? "text-xl" : size === "lg" ? "text-3xl" : "text-2xl"
            )}
          >
            {value}
          </p>
          {change !== undefined && (
            <div className="flex items-center gap-1.5 mt-2">
              {isPositive ? (
                <TrendingUp size={13} className="text-[var(--color-success)]" />
              ) : (
                <TrendingDown size={13} className="text-[var(--color-error)]" />
              )}
              <span
                className={cn(
                  "text-xs font-semibold",
                  isPositive ? "text-[var(--color-success)]" : "text-[var(--color-error)]"
                )}
              >
                {isPositive ? "+" : ""}
                {change.toFixed(2)}%
              </span>
              {changeLabel && (
                <span className="text-xs text-[var(--foreground)]/40">{changeLabel}</span>
              )}
            </div>
          )}
        </div>

        <div className={cn("p-3 rounded-xl shrink-0", iconBg)}>
          <Icon size={size === "sm" ? 16 : size === "lg" ? 22 : 18} className={iconColor} />
        </div>
      </div>
    </motion.div>
  );
}
