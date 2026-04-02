"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Zap, TrendingUp, TrendingDown, ChevronDown, Bookmark,
  BookmarkCheck, Filter, Clock, Target, AlertTriangle,
  CheckCircle2, ArrowRight, BarChart3
} from "lucide-react";
import { PageHeader } from "@/components/portal/widgets/PageHeader";
import { cn } from "@/lib/utils";

const mockSignals = [
  { id: 1, symbol: "XAUUSD", direction: "BUY",  entry: 2334.5, sl: 2318.0, tp: 2360.0, confidence: 87, timeframe: "H4", time: "2h ago", rrr: "1:1.6", status: "active", tags: ["Trend", "Breakout"] },
  { id: 2, symbol: "EURUSD", direction: "SELL", entry: 1.0882, sl: 1.0910, tp: 1.0835, confidence: 74, timeframe: "H1", time: "4h ago", rrr: "1:1.7", status: "active", tags: ["Reversal"] },
  { id: 3, symbol: "BTCUSDT", direction: "BUY",  entry: 68200,  sl: 66500,  tp: 71000,  confidence: 91, timeframe: "D1", time: "6h ago", rrr: "1:1.6", status: "active", tags: ["Trend", "AI-High"] },
  { id: 4, symbol: "GBPUSD", direction: "SELL", entry: 1.2645, sl: 1.2680, tp: 1.2570, confidence: 68, timeframe: "H4", time: "8h ago", rrr: "1:2.1", status: "closed", tags: ["Support/Resistance"] },
  { id: 5, symbol: "USDJPY", direction: "BUY",  entry: 151.82, sl: 151.20, tp: 153.40, confidence: 79, timeframe: "H4", time: "10h ago", rrr: "1:2.5", status: "active", tags: ["Trend"] },
  { id: 6, symbol: "ETHUSD", direction: "BUY",  entry: 3520,   sl: 3380,   tp: 3820,   confidence: 83, timeframe: "H4", time: "12h ago", rrr: "1:2.1", status: "active", tags: ["AI-High", "Momentum"] },
];

const confidenceColor = (c: number) => {
  if (c >= 85) return { text: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200", stroke: "stroke-emerald-500" };
  if (c >= 70) return { text: "text-blue-700", bg: "bg-blue-50", border: "border-blue-200", stroke: "stroke-blue-500" };
  return { text: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200", stroke: "stroke-amber-500" };
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
      className="rounded-2xl bg-white border-2 border-gray-200 hover:border-blue-300 transition-all overflow-hidden"
    >
      {/* Header bar */}
      <div className={cn(
        "h-1 w-full",
        isBuy ? "bg-gradient-to-r from-emerald-500 to-emerald-300" : "bg-gradient-to-r from-red-500 to-red-300"
      )} />

      <div className="p-5">
        {/* Top row */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-bold text-lg text-gray-900">{signal.symbol}</span>
              <span className={cn(
                "text-xs font-bold px-2 py-0.5 rounded-lg border",
                isBuy ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-red-50 text-red-700 border-red-200"
              )}>
                {signal.direction}
              </span>
              <span className="text-[11px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">
                {signal.timeframe}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {signal.tags.map((tag) => (
                <span key={tag} className={cn(
                  "text-[10px] px-1.5 py-0.5 rounded font-medium border",
                  tag === "AI-High" ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-gray-50 text-gray-600 border-gray-200"
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
                <circle cx="24" cy="24" r="20" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                <circle
                  cx="24" cy="24" r="20"
                  fill="none"
                  className={conf.stroke}
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
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200"
            >
              {saved
                ? <BookmarkCheck size={16} className="text-blue-600" />
                : <Bookmark size={16} className="text-gray-400" />}
            </motion.button>
          </div>
        </div>

        {/* Entry / SL / TP */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { label: "Entry", value: signal.entry, color: "text-gray-900" },
            { label: "Stop Loss", value: signal.sl, color: "text-red-600" },
            { label: "Take Profit", value: signal.tp, color: "text-emerald-600" },
          ].map(({ label, value, color }) => (
            <div key={label} className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 text-center">
              <p className="text-[10px] text-gray-400 mb-1">{label}</p>
              <p className={cn("text-sm font-semibold font-mono", color)}>{value}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-gray-400">
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
            "px-2 py-0.5 rounded-full text-[10px] font-medium border",
            signal.status === "active" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-gray-100 text-gray-600 border-gray-200"
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
            <div className="flex items-center gap-1 text-xs text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-xl">
              <Zap size={12} />
              <span>15 / 20 daily signals used</span>
            </div>
          </div>
        }
      />

      {/* Quota bar */}
      <div className="p-4 rounded-2xl bg-white border-2 border-gray-200 flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
          <Zap size={18} className="text-blue-600" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-gray-500">Daily Quota</span>
            <span className="font-bold text-gray-900">15 / 20 signals</span>
          </div>
          <div className="h-2 rounded-full bg-gray-100 border border-gray-200">
            <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" style={{ width: "75%" }} />
          </div>
        </div>
        <button className="text-xs font-bold text-blue-600 hover:text-blue-700 shrink-0">
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
              "px-4 py-1.5 rounded-xl text-sm font-semibold transition-all border-2",
              filter === f
                ? f === "buy" ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                  : f === "sell" ? "bg-red-50 text-red-700 border-red-300"
                  : "bg-blue-50 text-blue-700 border-blue-300"
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
            )}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-1 text-xs text-gray-500 cursor-pointer hover:text-gray-700 bg-white border border-gray-200 px-3 py-1.5 rounded-xl">
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
