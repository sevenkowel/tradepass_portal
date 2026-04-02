"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Clock,
  Target,
  Shield,
  AlertTriangle,
  BarChart3,
  Zap,
  Share2,
  Bookmark,
  Check,
} from "lucide-react";
import { PageHeader } from "@/components/portal/widgets/PageHeader";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

// ─── Mock Data ─────────────────────────────────────────────
const signalData = {
  id: 1,
  symbol: "XAUUSD",
  direction: "BUY",
  entry: 2334.5,
  sl: 2318.0,
  tp: 2360.0,
  confidence: 87,
  timeframe: "H4",
  strategy: "Trend",
  createdAt: "2 hours ago",
  expiresAt: "6 hours",
  status: "active",
  description: "Gold is showing strong bullish momentum after breaking above the 2320 resistance level. The 4-hour chart confirms an uptrend with RSI at 58, indicating room for further upside.",
  analysis: {
    trend: "Bullish",
    support: 2320,
    resistance: 2350,
    rsi: 58,
    macd: "Bullish crossover",
    volume: "Above average",
  },
  riskReward: 1.6,
  historicalAccuracy: 78,
};

// ─── Components ────────────────────────────────────────────
function ConfidenceRing({ value }: { value: number }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="relative w-20 h-20">
      <svg className="w-full h-full -rotate-90">
        <circle
          cx="40"
          cy="40"
          r={radius}
          stroke="#e5e7eb"
          strokeWidth="6"
          fill="none"
        />
        <circle
          cx="40"
          cy="40"
          r={radius}
          stroke={value >= 80 ? "#10b981" : value >= 60 ? "#3b82f6" : "#f59e0b"}
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold text-gray-800">{value}%</span>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────
export default function SignalDetailPage() {
  const params = useParams();
  const [saved, setSaved] = useState(false);
  const isBuy = signalData.direction === "BUY";

  return (
    <div className="space-y-6">
      {/* Back Link */}
      <Link
        href="/portal/ai-signals/feed"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Signals
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-gray-800">{signalData.symbol}</h1>
            <span
              className={cn(
                "text-sm font-bold px-3 py-1 rounded-lg border",
                isBuy
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-red-50 text-red-700 border-red-200"
              )}
            >
              {isBuy ? "BUY" : "SELL"}
            </span>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-200 px-2 py-1 rounded-lg">
              {signalData.timeframe}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400">{signalData.createdAt}</span>
            <span className="text-xs text-gray-300">•</span>
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <Clock size={12} />
              Expires in {signalData.expiresAt}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSaved(!saved)}
            className={cn(
              "p-2.5 rounded-xl border-2 transition-all",
              saved
                ? "bg-blue-50 border-blue-200 text-blue-600"
                : "bg-white border-gray-200 text-gray-400 hover:border-gray-300"
            )}
          >
            <Bookmark size={18} />
          </button>
          <button className="p-2.5 rounded-xl border-2 border-gray-200 text-gray-400 hover:border-gray-300 transition-all">
            <Share2 size={18} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left: Signal Details */}
        <div className="lg:col-span-2 space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border-2 border-gray-200 p-5"
          >
            <h2 className="font-bold text-gray-800 mb-4">Signal Details</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              {signalData.description}
            </p>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-400 mb-1">Entry Price</p>
                <p className="text-xl font-bold text-gray-800">{signalData.entry}</p>
              </div>
              <div className="bg-red-50 rounded-xl p-4 text-center border border-red-100">
                <p className="text-xs text-red-400 mb-1">Stop Loss</p>
                <p className="text-xl font-bold text-red-600">{signalData.sl}</p>
              </div>
              <div className="bg-emerald-50 rounded-xl p-4 text-center border border-emerald-100">
                <p className="text-xs text-emerald-600 mb-1">Take Profit</p>
                <p className="text-xl font-bold text-emerald-600">{signalData.tp}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl border-2 border-gray-200 p-5"
          >
            <h2 className="font-bold text-gray-800 mb-4">Technical Analysis</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-sm text-gray-500">Trend</span>
                <span className="text-sm font-semibold text-emerald-600">{signalData.analysis.trend}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-sm text-gray-500">RSI</span>
                <span className="text-sm font-semibold text-gray-800">{signalData.analysis.rsi}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-sm text-gray-500">Support</span>
                <span className="text-sm font-semibold text-gray-800">{signalData.analysis.support}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-sm text-gray-500">Resistance</span>
                <span className="text-sm font-semibold text-gray-800">{signalData.analysis.resistance}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-sm text-gray-500">MACD</span>
                <span className="text-sm font-semibold text-emerald-600">{signalData.analysis.macd}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-sm text-gray-500">Volume</span>
                <span className="text-sm font-semibold text-gray-800">{signalData.analysis.volume}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right: Stats */}
        <div className="space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border-2 border-gray-200 p-5"
          >
            <h2 className="font-bold text-gray-800 mb-4">Confidence Score</h2>
            <div className="flex justify-center py-4">
              <ConfidenceRing value={signalData.confidence} />
            </div>
            <p className="text-center text-sm text-gray-500">
              Based on technical indicators and historical data
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl border-2 border-gray-200 p-5"
          >
            <h2 className="font-bold text-gray-800 mb-4">Signal Stats</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Risk:Reward</span>
                <span className="text-sm font-semibold text-gray-800">1:{signalData.riskReward}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Historical Accuracy</span>
                <span className="text-sm font-semibold text-emerald-600">{signalData.historicalAccuracy}%</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-500">Strategy</span>
                <span className="text-sm font-semibold text-blue-600">{signalData.strategy}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200 p-5"
          >
            <h2 className="font-bold text-gray-800 mb-2">Trade This Signal</h2>
            <p className="text-sm text-gray-600 mb-4">
              Open a position based on this AI-generated signal
            </p>
            <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition-colors">
              Open Position
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
