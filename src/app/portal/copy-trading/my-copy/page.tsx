"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users, TrendingUp, TrendingDown, DollarSign, Pause, Play,
  Settings, X, AlertCircle, Wallet, BarChart3
} from "lucide-react";
import { PageHeader } from "@/components/portal/widgets/PageHeader";
import { cn } from "@/lib/utils";

const mockCopying = [
  { id: 1, name: "ProTrader_X", roi: 45.2, pnl: 1250, invested: 5000, status: "active", trades: 156, winRate: 68 },
  { id: 2, name: "GoldMaster", roi: 28.7, pnl: 574, invested: 2000, status: "active", trades: 89, winRate: 72 },
  { id: 3, name: "CryptoKing", roi: -5.3, pnl: -159, invested: 3000, status: "paused", trades: 45, winRate: 55 },
];

export default function MyCopyPage() {
  const [copied, setCopied] = useState(mockCopying);

  const totalInvested = copied.reduce((sum, c) => sum + c.invested, 0);
  const totalPnL = copied.reduce((sum, c) => sum + c.pnl, 0);
  const activeCount = copied.filter((c) => c.status === "active").length;

  const toggleStatus = (id: number) => {
    setCopied((prev) => prev.map((c) => c.id === id ? { ...c, status: c.status === "active" ? "paused" : "active" } : c));
  };

  return (
    <div className="space-y-6">
      <PageHeader title="My Copy Trading" description="Manage your copy trading portfolio and track performance." />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Invested", value: `$${totalInvested.toLocaleString()}`, color: "blue" },
          { label: "Total P&L", value: `${totalPnL >= 0 ? "+" : ""}$${totalPnL.toLocaleString()}`, color: totalPnL >= 0 ? "emerald" : "red" },
          { label: "Active Copying", value: activeCount.toString(), color: "indigo" },
          { label: "Total Trades", value: "290", color: "amber" },
        ].map(({ label, value, color }) => (
          <div key={label} className={cn(
            "rounded-2xl bg-white border-2 p-4",
            color === "blue" && "border-blue-200",
            color === "emerald" && "border-emerald-200",
            color === "red" && "border-red-200",
            color === "indigo" && "border-indigo-200",
            color === "amber" && "border-amber-200",
          )}>
            <p className="text-xs font-medium text-gray-500 mb-1">{label}</p>
            <p className={cn(
              "text-xl font-bold",
              color === "blue" && "text-blue-700",
              color === "emerald" && "text-emerald-700",
              color === "red" && "text-red-700",
              color === "indigo" && "text-indigo-700",
              color === "amber" && "text-amber-700",
            )}>{value}</p>
          </div>
        ))}
      </div>

      {/* Providers */}
      <div className="space-y-4">
        {copied.map((provider, i) => (
          <motion.div
            key={provider.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl bg-white border-2 border-gray-200 p-5 hover:border-blue-300 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                  {provider.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{provider.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={cn(
                      "text-xs font-bold px-2 py-0.5 rounded-lg border",
                      provider.status === "active" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-700 border-amber-200"
                    )}>
                      {provider.status === "active" ? "● Active" : "⏸ Paused"}
                    </span>
                    <span className="text-xs text-gray-400">{provider.trades} trades</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className={cn(
                  "text-lg font-bold",
                  provider.pnl >= 0 ? "text-emerald-600" : "text-red-600"
                )}>
                  {provider.pnl >= 0 ? "+" : ""}${provider.pnl}
                </p>
                <p className={cn(
                  "text-xs font-bold",
                  provider.roi >= 0 ? "text-emerald-600" : "text-red-600"
                )}>
                  {provider.roi >= 0 ? "+" : ""}{provider.roi}%
                </p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3 mb-4">
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                <p className="text-[10px] text-gray-400 font-medium">Invested</p>
                <p className="text-sm font-bold text-gray-800">${provider.invested}</p>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                <p className="text-[10px] text-gray-400 font-medium">Win Rate</p>
                <p className="text-sm font-bold text-gray-800">{provider.winRate}%</p>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                <p className="text-[10px] text-gray-400 font-medium">Trades</p>
                <p className="text-sm font-bold text-gray-800">{provider.trades}</p>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                <p className="text-[10px] text-gray-400 font-medium">ROI</p>
                <p className={cn(
                  "text-sm font-bold",
                  provider.roi >= 0 ? "text-emerald-600" : "text-red-600"
                )}>
                  {provider.roi >= 0 ? "+" : ""}{provider.roi}%
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleStatus(provider.id)}
                className={cn(
                  "flex-1 py-2 rounded-xl text-xs font-bold border-2 transition-colors flex items-center justify-center gap-1.5",
                  provider.status === "active"
                    ? "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
                    : "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                )}
              >
                {provider.status === "active" ? <Pause size={12} /> : <Play size={12} />}
                {provider.status === "active" ? "Pause" : "Resume"}
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.98 }}
                className="flex-1 py-2 rounded-xl bg-blue-50 text-blue-700 border-2 border-blue-200 hover:bg-blue-100 transition-colors text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <Settings size={12} /> Settings
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 rounded-xl bg-red-50 text-red-600 border-2 border-red-200 hover:bg-red-100 transition-colors"
              >
                <X size={14} />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Risk warning */}
      <div className="flex items-start gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-xl p-4">
        <AlertCircle size={16} className="shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Risk Warning</p>
          <p className="mt-1">Copy trading involves substantial risk. Past performance does not guarantee future results. Only invest what you can afford to lose.</p>
        </div>
      </div>
    </div>
  );
}
