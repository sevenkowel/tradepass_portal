"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  DollarSign, TrendingUp, Calendar, Download, ChevronDown,
  ArrowUpDown, Wallet, PieChart
} from "lucide-react";
import { PageHeader } from "@/components/portal/widgets/PageHeader";
import { cn } from "@/lib/utils";

const mockCommissionHistory = [
  { id: "COM001", date: "2025-03-28", client: "John Smith", type: "Spread", amount: 45.50, symbol: "XAUUSD", volume: 0.5 },
  { id: "COM002", date: "2025-03-28", client: "Sarah Chen", type: "Spread", amount: 32.20, symbol: "EURUSD", volume: 1.0 },
  { id: "COM003", date: "2025-03-27", client: "Emma Wilson", type: "Spread", amount: 78.90, symbol: "XAUUSD", volume: 1.2 },
  { id: "COM004", date: "2025-03-27", client: "Lisa Wang", type: "Spread", amount: 56.40, symbol: "BTCUSDT", volume: 0.02 },
  { id: "COM005", date: "2025-03-26", client: "John Smith", type: "Spread", amount: 23.10, symbol: "GBPUSD", volume: 0.3 },
  { id: "COM006", date: "2025-03-26", client: "David Lee", type: "Spread", amount: 18.75, symbol: "USDJPY", volume: 0.5 },
  { id: "COM007", date: "2025-03-25", client: "Sarah Chen", type: "Spread", amount: 41.30, symbol: "EURUSD", volume: 0.8 },
  { id: "COM008", date: "2025-03-25", client: "Emma Wilson", type: "Spread", amount: 92.60, symbol: "XAUUSD", volume: 1.5 },
];

export default function CommissionPage() {
  const [period, setPeriod] = useState<"7d" | "30d" | "90d" | "all">("30d");

  const totalCommission = mockCommissionHistory.reduce((sum, c) => sum + c.amount, 0);
  const avgPerDay = totalCommission / 30;
  const topClient = "Emma Wilson";

  return (
    <div className="space-y-6">
      <PageHeader title="Commission History" description="Track your IB commission earnings in detail." />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Earned", value: `$${totalCommission.toFixed(2)}`, color: "emerald" },
          { label: "Avg / Day", value: `$${avgPerDay.toFixed(2)}`, color: "blue" },
          { label: "This Month", value: "$1,847.32", color: "indigo" },
          { label: "Top Client", value: topClient, color: "amber" },
        ].map(({ label, value, color }) => (
          <div key={label} className={cn(
            "rounded-2xl bg-white border-2 p-4",
            color === "emerald" && "border-emerald-200",
            color === "blue" && "border-blue-200",
            color === "indigo" && "border-indigo-200",
            color === "amber" && "border-amber-200",
          )}>
            <p className="text-xs font-medium text-gray-500 mb-1">{label}</p>
            <p className={cn(
              "text-lg font-bold truncate",
              color === "emerald" && "text-emerald-700",
              color === "blue" && "text-blue-700",
              color === "indigo" && "text-indigo-700",
              color === "amber" && "text-amber-700",
            )}>{value}</p>
          </div>
        ))}
      </div>

      {/* Chart placeholder */}
      <div className="rounded-2xl bg-white border-2 border-gray-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center">
              <PieChart size={16} className="text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-900">Commission Trend</h3>
          </div>
          <div className="flex items-center gap-2">
            {(["7d", "30d", "90d", "all"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={cn(
                  "px-3 py-1 rounded-lg text-xs font-semibold transition-all border",
                  period === p
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                )}
              >
                {p === "all" ? "All" : p}
              </button>
            ))}
          </div>
        </div>
        <div className="h-48 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center">
          <p className="text-gray-400 text-sm">Commission chart visualization</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-white border-2 border-gray-200 px-3 py-2 rounded-xl hover:border-gray-300 transition-colors">
          <Calendar size={14} /> Last 30 Days
        </button>
        <button className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 bg-blue-50 border-2 border-blue-200 px-3 py-2 rounded-xl hover:bg-blue-100 transition-colors">
          <Download size={14} /> Export CSV
        </button>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-white border-2 border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["Date", "Client", "Symbol", "Volume", "Type", "Commission"].map((h) => (
                  <th key={h} className="text-xs font-bold text-gray-400 px-4 py-3 text-left uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockCommissionHistory.map((com, i) => (
                <motion.tr
                  key={com.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors"
                >
                  <td className="px-4 py-3.5 text-sm text-gray-600">{com.date}</td>
                  <td className="px-4 py-3.5 text-sm font-semibold text-gray-900">{com.client}</td>
                  <td className="px-4 py-3.5 text-sm font-mono text-gray-700">{com.symbol}</td>
                  <td className="px-4 py-3.5 text-sm text-gray-600">{com.volume}</td>
                  <td className="px-4 py-3.5">
                    <span className="text-xs font-bold px-2 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
                      {com.type}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-sm font-mono font-bold text-emerald-600">+${com.amount.toFixed(2)}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
