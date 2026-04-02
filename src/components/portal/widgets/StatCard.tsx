"use client";

import { motion } from "framer-motion";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change?: number;
  changeLabel?: string;
  icon: LucideIcon;
  delay?: number;
  progressColor?: "blue" | "green" | "red" | "orange" | "purple" | "default";
  progressValue?: number;
}

export function StatCard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  delay = 0,
  progressColor = "default",
  progressValue,
}: StatCardProps) {
  const isPositive = change === undefined ? undefined : change > 0;
  const isNegative = change === undefined ? undefined : change < 0;

  const colorMap = {
    blue:    { icon: "text-blue-600",    bg: "bg-blue-50",    border: "border-blue-200",   bar: "bg-blue-500"   },
    green:   { icon: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200", bar: "bg-emerald-500" },
    red:     { icon: "text-red-600",     bg: "bg-red-50",     border: "border-red-200",    bar: "bg-red-500"    },
    orange:  { icon: "text-amber-600",   bg: "bg-amber-50",   border: "border-amber-200",  bar: "bg-amber-500"  },
    purple:  { icon: "text-purple-600",  bg: "bg-purple-50",  border: "border-purple-200", bar: "bg-purple-500" },
    default: { icon: "text-gray-500",    bg: "bg-gray-50",    border: "border-gray-200",   bar: "bg-gray-300"   },
  };

  const c = colorMap[progressColor];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className="bg-white rounded-2xl border border-gray-200 p-5 hover:border-blue-300 hover:shadow-md transition-all duration-200"
    >
      {/* Icon + badge row */}
      <div className="flex items-start justify-between mb-4">
        <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center border", c.bg, c.border)}>
          <Icon size={20} className={c.icon} />
        </div>
        {change !== undefined && (
          <div className={cn(
            "flex items-center gap-0.5 text-xs font-semibold px-2 py-1 rounded-lg",
            isPositive && "bg-emerald-50 text-emerald-600 border border-emerald-200",
            isNegative && "bg-red-50 text-red-600 border border-red-200",
            !isPositive && !isNegative && "bg-gray-50 text-gray-500 border border-gray-200"
          )}>
            {isPositive ? <TrendingUp size={11} /> : isNegative ? <TrendingDown size={11} /> : null}
            {isPositive && "+"}
            {change}%
          </div>
        )}
      </div>

      {/* Value */}
      <p className="text-2xl font-bold text-gray-900 tracking-tight">{value}</p>

      {/* Title */}
      <p className="text-sm text-gray-500 mt-1">{title}</p>

      {/* Change label */}
      {changeLabel && (
        <p className="text-xs text-gray-400 mt-0.5">{changeLabel}</p>
      )}

      {/* Progress bar */}
      {progressValue !== undefined && (
        <div className="mt-4">
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progressValue, 100)}%` }}
              transition={{ duration: 0.8, delay: delay + 0.2 }}
              className={cn("h-full rounded-full", c.bar)}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}
