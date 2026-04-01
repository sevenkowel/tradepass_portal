"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Zap,
  TrendingUp,
  TrendingDown,
  ChevronDown,
  Bookmark,
  BookmarkCheck,
  Filter,
  Clock,
  Target,
  AlertTriangle,
} from "lucide-react";
import { PageHeader } from "@/components/portal/widgets/PageHeader";
import { cn } from "@/lib/utils";

const mockSignals = [
  { id: 1, symbol: "XAUUSD", direction: "BUY", entry: 2334.5, sl: 2318.0, tp: 2360.0, confidence: 87, timeframe: "H4", time: "2h ago", rrr: "1:1.6", status: "active", tags: ["Trend", "Breakout"] },
  { id: 2, symbol: "EURUSD", direction: "SELL", entry: 1.0882, sl: 1.0910, tp: 1.0835, confidence: 74, timeframe: "H1", time: "4h ago", rrr: "1:1.7", status: "active", tags: ["Reversal"] },
  { id: 3, symbol: "BTCUSDT", direction: "BUY", entry: 68200, sl: 66500, tp: 71000, confidence: 91, timeframe: "D1", time: "6h ago", rrr: "1:1.6", status: "active", tags: ["Trend", "AI-High"] },
  { id: 4, symbol: "GBPUSD", direction: "SELL", entry: 1.2645, sl: 1.2680, tp: 1.2570, confidence: 68, timeframe: "H4", time: "8h ago", rrr: "1:2.1", status: "closed", tags: ["Support/Resistance"] },
  { id: 5, symbol: "USDJPY", direction: "BUY", entry: 151.82, sl: 151.20, tp: 153.40, confidence: 79, timeframe: "H4", time: "10h ago", rrr: "1:2.5", status: "active", tags: ["Trend"] },
  { id: 6, symbol: "ETHUSD", direction: "BUY", entry: 3520, sl: 3380, tp: 3820, confidence: 83, timeframe: "H4", time: "12h ago", rrr: "1:2.1", status: "active", tags: ["AI-High", "Momentum"] },
];

const confidenceColor = (c: number) => {
  if (c >= 85) return { text: "text-[var(--color-success)]", bg: "bg-[var(--color-success)]" };
  if (c >= 70) return { text: "text-[var(--color-accent)]", bg: "bg-[var(--color-accent)]" };
  return { text: "text-[var(--color-warning)]", bg: "bg-[var(--color-warning)]" };
};

function SignalCard({ signal, saved, onSave }: {
  signal: (typeof mockSignals)[0];
  saved: boolean;
  onSave: () => void;
}) {
  const isBuy = signal.direction === "BUY";
  const conf = confidenceColor(signal.confidence);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--color-accent)]/20 transition-all overflow-hidden"
    >
      {/* Header bar */}
      <div className={cn(
        "h-0.5 w-full",
        isBuy ? "bg-gradient-to-r from-[var(--color-success)] to-transparent" : "bg-gradient-to-r from-[var(--color-error)] to-transparent"
      )} />

      <div className="p-5">
        {/* Top row */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-heading font-bold text-lg">{signal.symbol}</span>
              <span className={cn(
                "text-xs font-bold px-2 py-0.5 rounded-lg",
                isBuy ? "bg-[var(--color-success)]/15 text-[var(--color-success)]" : "bg-[var(--color-error)]/15 text-[var(--color-error)]"
              )}>
                {signal.direction}
              </span>
              <span className="text-[11px] text-[var(--foreground)]/40 bg-[var(--surface-elevated)] px-1.5 py-0.5 rounded">
                {signal.timeframe}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {signal.tags.map((tag) => (
                <span key={tag} className={cn(
                  "text-[10px] px-1.5 py-0.5 rounded font-medium",
                  tag === "AI-High" ? "bg-[var(--color-accent)]/15 text-[var(--color-accent)]" : "bg-[var(--surface-elevated)] text-[var(--foreground)]/50"
                )}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Confidence ring */}
            <div className="relative w-12 h-12">
              <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
                <circle cx="24" cy="24" r="20" fill="none" stroke="var(--border)" strokeWidth="3" />
                <circle
                  cx="24" cy="24" r="20"
                  fill="none"
                  className={cn(
                    signal.confidence >= 85 ? "stroke-[var(--color-success)]"
                    : signal.confidence >= 70 ? "stroke-[var(--color-accent)]"
                    : "stroke-[var(--color-warning)]"
                  )}
                  strokeWidth="3"
                  strokeDasharray={`${(signal.confidence / 100) * 125.6} 125.6`}
                  strokeLinecap="round"
                />
              </svg>
              <span className={cn("absolute inset-0 flex items-center justify-center text-[11px] font-bold", conf.text)}>
                {signal.confidence}%
              </span>
            </div>
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={onSave}
              className="p-1.5 rounded-lg hover:bg-[var(--surface-elevated)] transition-colors"
            >
              {saved
                ? <BookmarkCheck size={16} className="text-[var(--color-accent)]" />
                : <Bookmark size={16} className="text-[var(--foreground)]/30" />}
            </motion.button>
          </div>
        </div>

        {/* Entry / SL / TP */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { label: "Entry", value: signal.entry, color: "" },
            { label: "Stop Loss", value: signal.sl, color: "text-[var(--color-error)]" },
            { label: "Take Profit", value: signal.tp, color: "text-[var(--color-success)]" },
          ].map(({ label, value, color }) => (
            <div key={label} className="p-2.5 rounded-xl bg-[var(--surface-elevated)] text-center">
              <p className="text-[10px] text-[var(--foreground)]/40 mb-1">{label}</p>
              <p className={cn("text-sm font-semibold font-mono", color)}>{value}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-[var(--foreground)]/40">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Target size={11} />
              R:R {signal.rrr}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {signal.time}
            </span>
          </div>
          <span className={cn(
            "px-2 py-0.5 rounded-full text-[10px] font-medium",
            signal.status === "active" ? "bg-[var(--color-success)]/10 text-[var(--color-success)]" : "bg-[var(--surface-elevated)]"
          )}>
            {signal.status === "active" ? "● Active" : "Closed"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function AISignalsFeedPage() {
  const [savedIds, setSavedIds] = useState<Set<number>>(new Set());
  const [filter, setFilter] = useState<"all" | "buy" | "sell">("all");

  const toggleSave = (id: number) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filtered = mockSignals.filter((s) => {
    if (filter === "buy") return s.direction === "BUY";
    if (filter === "sell") return s.direction === "SELL";
    return true;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Signals"
        description="AI-powered trading signals with real-time confidence scores."
        actions={
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-xs text-[var(--color-accent)] bg-[var(--color-accent)]/10 px-3 py-1.5 rounded-xl">
              <Zap size={12} />
              <span>15 / 20 daily signals used</span>
            </div>
          </div>
        }
      />

      {/* Quota bar */}
      <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] flex items-center gap-4">
        <div className="w-8 h-8 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center shrink-0">
          <Zap size={15} className="text-[var(--color-accent)]" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-[var(--foreground)]/60">Daily Quota</span>
            <span className="font-semibold">15 / 20 signals</span>
          </div>
          <div className="h-1.5 rounded-full bg-[var(--border)]">
            <div className="h-full rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-secondary)]" style={{ width: "75%" }} />
          </div>
        </div>
        <button className="text-xs font-semibold text-[var(--color-accent)] hover:underline shrink-0">
          Upgrade
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        {(["all", "buy", "sell"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-4 py-1.5 rounded-xl text-sm font-medium transition-all",
              filter === f
                ? f === "buy" ? "bg-[var(--color-success)]/15 text-[var(--color-success)]"
                  : f === "sell" ? "bg-[var(--color-error)]/15 text-[var(--color-error)]"
                  : "bg-[var(--color-accent)]/15 text-[var(--color-accent)]"
                : "text-[var(--foreground)]/50 hover:text-[var(--foreground)] hover:bg-[var(--surface-elevated)]"
            )}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-1 text-xs text-[var(--foreground)]/50 cursor-pointer hover:text-[var(--foreground)]">
          <Filter size={13} />
          Filter
        </div>
      </div>

      {/* Signal grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((signal) => (
          <SignalCard
            key={signal.id}
            signal={signal}
            saved={savedIds.has(signal.id)}
            onSave={() => toggleSave(signal.id)}
          />
        ))}
      </div>
    </div>
  );
}
