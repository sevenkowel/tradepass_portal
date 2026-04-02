"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  TrendingUp,
  Users,
  BarChart3,
  AlertTriangle,
  Clock,
  Calendar,
  ChevronRight,
  Copy,
  Wallet,
  Shield,
  Star,
} from "lucide-react";
import { PageHeader } from "@/components/portal/widgets/PageHeader";
import { cn, formatCurrency, formatPercent } from "@/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";

// ─── Mock Data ─────────────────────────────────────────────
const traderData = {
  id: 1,
  name: "AlphaEdge Pro",
  avatar: "AE",
  roi: 142.8,
  drawdown: 8.2,
  followers: 1240,
  copiers: 892,
  totalProfit: 125800,
  winRate: 68.5,
  totalTrades: 1256,
  avgTrade: 45,
  profitFactor: 2.34,
  sharpeRatio: 1.85,
  description: "Professional forex trader with 8+ years of experience. Specializing in major currency pairs with a focus on risk management and consistent returns.",
  strategy: "Trend following with technical analysis. Uses moving averages, RSI, and support/resistance levels to identify high-probability setups.",
  joinedAt: "Jan 2023",
  lastTrade: "5 min ago",
  verified: true,
  riskLevel: "Medium",
};

const performanceData = [
  { month: "Jan", return: 8.5 },
  { month: "Feb", return: 12.3 },
  { month: "Mar", return: -3.2 },
  { month: "Apr", return: 15.7 },
  { month: "May", return: 9.8 },
  { month: "Jun", return: 11.2 },
];

const recentTrades = [
  { id: 1, symbol: "EURUSD", type: "BUY", profit: 245, time: "5 min ago" },
  { id: 2, symbol: "GBPUSD", type: "SELL", profit: -45, time: "15 min ago" },
  { id: 3, symbol: "XAUUSD", type: "BUY", profit: 580, time: "1 hour ago" },
  { id: 4, symbol: "USDJPY", type: "SELL", profit: 120, time: "2 hours ago" },
];

// ─── Components ────────────────────────────────────────────
function StatCard({ title, value, subValue, icon: Icon, iconBg, iconColor }: {
  title: string;
  value: string;
  subValue?: string;
  icon: any;
  iconBg: string;
  iconColor: string;
}) {
  return (
    <div className="bg-white rounded-2xl border-2 border-gray-200 p-4">
      <div className="flex items-center gap-3">
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", iconBg)}>
          <Icon size={18} className={iconColor} />
        </div>
        <div>
          <p className="text-xs text-gray-400">{title}</p>
          <p className="text-lg font-bold text-gray-800">{value}</p>
          {subValue && <p className="text-xs text-gray-400">{subValue}</p>}
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────
export default function TraderDetailPage() {
  const params = useParams();

  return (
    <div className="space-y-6">
      {/* Back Link */}
      <Link href="/portal/copy-trading/discover" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">
        <ArrowLeft size={16} />
        Back to Traders
      </Link>

      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white text-xl font-bold shrink-0">
          {traderData.avatar}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-800">{traderData.name}</h1>
            {traderData.verified && (
              <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                <Shield size={12} className="text-white" />
              </div>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-1">{traderData.description}</p>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-xs text-gray-400">Joined {traderData.joinedAt}</span>
            <span className="text-xs text-gray-300">•</span>
            <span className="text-xs text-gray-400">Last trade {traderData.lastTrade}</span>
          </div>
        </div>
        <Link href={`/portal/copy-trading/my-copy?trader=${traderData.id}`}>
          <button className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Copy size={18} />
            Copy Trader
          </button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total ROI" value={`+${traderData.roi}%`} icon={TrendingUp} iconBg="bg-emerald-50" iconColor="text-emerald-600" />
        <StatCard title="Max Drawdown" value={`${traderData.drawdown}%`} icon={AlertTriangle} iconBg="bg-red-50" iconColor="text-red-600" />
        <StatCard title="Copiers" value={traderData.copiers.toLocaleString()} icon={Users} iconBg="bg-blue-50" iconColor="text-blue-600" />
        <StatCard title="Win Rate" value={`${traderData.winRate}%`} icon={BarChart3} iconBg="bg-purple-50" iconColor="text-purple-600" />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left: Performance */}
        <div className="lg:col-span-2 space-y-5">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border-2 border-gray-200 p-5">
            <h2 className="font-bold text-gray-800 mb-4">Performance</h2>
            <div className="h-48 flex items-end gap-2">
              {performanceData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className={cn(
                      "w-full rounded-t-lg transition-all",
                      data.return >= 0 ? "bg-emerald-400" : "bg-red-400"
                    )}
                    style={{ height: `${Math.abs(data.return) * 3}%` }}
                  />
                  <span className="text-xs text-gray-400">{data.month}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl border-2 border-gray-200 p-5">
            <h2 className="font-bold text-gray-800 mb-4">Strategy</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{traderData.strategy}</p>
          </motion.div>
        </div>

        {/* Right: Stats & Trades */}
        <div className="space-y-5">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border-2 border-gray-200 p-5">
            <h2 className="font-bold text-gray-800 mb-4">Statistics</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Total Trades</span>
                <span className="text-sm font-semibold text-gray-800">{traderData.totalTrades}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Avg Trade</span>
                <span className="text-sm font-semibold text-gray-800">{traderData.avgTrade} pips</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Profit Factor</span>
                <span className="text-sm font-semibold text-emerald-600">{traderData.profitFactor}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Sharpe Ratio</span>
                <span className="text-sm font-semibold text-gray-800">{traderData.sharpeRatio}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-500">Risk Level</span>
                <span className={cn(
                  "text-sm font-semibold px-2 py-0.5 rounded",
                  traderData.riskLevel === "Low" ? "bg-emerald-50 text-emerald-600" :
                  traderData.riskLevel === "Medium" ? "bg-amber-50 text-amber-600" :
                  "bg-red-50 text-red-600"
                )}>
                  {traderData.riskLevel}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl border-2 border-gray-200 p-5">
            <h2 className="font-bold text-gray-800 mb-4">Recent Trades</h2>
            <div className="space-y-2">
              {recentTrades.map((trade) => (
                <div key={trade.id} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "text-[10px] font-bold px-1.5 py-0.5 rounded",
                      trade.type === "BUY" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
                    )}>
                      {trade.type}
                    </span>
                    <span className="text-sm font-medium text-gray-700">{trade.symbol}</span>
                  </div>
                  <div className="text-right">
                    <p className={cn("text-sm font-semibold", trade.profit >= 0 ? "text-emerald-600" : "text-red-600")}>
                      {trade.profit >= 0 ? "+" : ""}${trade.profit}
                    </p>
                    <p className="text-xs text-gray-400">{trade.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
