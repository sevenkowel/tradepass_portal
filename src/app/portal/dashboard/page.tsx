"use client";

import { motion } from "framer-motion";
import {
  Wallet,
  TrendingUp,
  ArrowDownToLine,
  ArrowUpFromLine,
  ArrowLeftRight,
  Plus,
  Zap,
  Copy,
  Bell,
  CheckSquare,
  ChevronRight,
  Shield,
  BarChart2,
  Star,
  Activity,
} from "lucide-react";
import { StatCard } from "@/components/portal/widgets/StatCard";
import { PageHeader } from "@/components/portal/widgets/PageHeader";
import { usePortalStore } from "@/store/portalStore";
import { formatCurrency, formatPercent, cn } from "@/lib/utils";
import Link from "next/link";

// ─── Mock Data ─────────────────────────────────────────────
const mockAccounts = [
  { id: "MT5-8843201", type: "Real", balance: 28400.5, equity: 29100.2, server: "TradePass-Live", leverage: "1:100", currency: "USD", profit: 2.46 },
  { id: "MT5-8843202", type: "Real", balance: 15200.0, equity: 15080.5, server: "TradePass-Live", leverage: "1:200", currency: "USD", profit: -0.79 },
  { id: "MT5-0099013", type: "Demo", balance: 100000, equity: 102450, server: "TradePass-Demo", leverage: "1:500", currency: "USD", profit: 2.45 },
];

const mockSignals = [
  { id: 1, symbol: "XAUUSD", direction: "BUY", entry: 2334.5, sl: 2318.0, tp: 2360.0, confidence: 87, timeframe: "H4", time: "2h ago" },
  { id: 2, symbol: "EURUSD", direction: "SELL", entry: 1.0882, sl: 1.0910, tp: 1.0835, confidence: 74, timeframe: "H1", time: "4h ago" },
  { id: 3, symbol: "BTCUSDT", direction: "BUY", entry: 68200, sl: 66500, tp: 71000, confidence: 91, timeframe: "D1", time: "6h ago" },
];

const mockTraders = [
  { id: 1, name: "AlphaEdge Pro", roi: 142.8, drawdown: 8.2, followers: 1240, avatar: "AE", copiers: 892 },
  { id: 2, name: "FX Sentinel", roi: 98.4, drawdown: 12.1, followers: 680, avatar: "FS", copiers: 421 },
  { id: 3, name: "Quantum Scalper", roi: 76.5, drawdown: 6.8, followers: 2100, avatar: "QS", copiers: 1580 },
];

const mockTasks = [
  { id: 1, title: "Complete KYC Verification", reward: "$50 bonus", progress: 60, icon: Shield, href: "/portal/settings/verification" },
  { id: 2, title: "Make First Deposit", reward: "5% deposit bonus", progress: 0, icon: ArrowDownToLine, href: "/portal/wallet/deposit" },
  { id: 3, title: "Complete 10 Trades", reward: "Trading rebate", progress: 30, icon: BarChart2, href: "/portal/trading/accounts" },
];

const mockAnnouncements = [
  { id: 1, type: "update", title: "New AI Signal Models Released", desc: "3 new deep learning models for Forex signals are now live.", time: "1h ago" },
  { id: 2, type: "promo", title: "Summer Trading Bonus — Up to 30%", desc: "Deposit and trade to earn bonus rewards this summer season.", time: "2d ago" },
];
// ────────────────────────────────────────────────────────────

// Quick Action button — white-fill + blue border + large rounded corners
function QuickAction({
  icon: Icon,
  label,
  href,
  iconBg = "bg-blue-50",
  iconColor = "text-blue-600",
  borderColor = "border-blue-200",
  hoverBorder = "hover:border-blue-400",
}: {
  icon: React.ElementType;
  label: string;
  href: string;
  iconBg?: string;
  iconColor?: string;
  borderColor?: string;
  hoverBorder?: string;
}) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.97 }}
        className={cn(
          "flex flex-col items-center justify-center gap-2.5 p-4 rounded-2xl",
          "bg-white border-2 cursor-pointer transition-all duration-200",
          "hover:shadow-md",
          borderColor,
          hoverBorder
        )}
      >
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", iconBg)}>
          <Icon size={18} className={iconColor} />
        </div>
        <span className="text-xs font-semibold text-gray-700">{label}</span>
      </motion.div>
    </Link>
  );
}

// Account Card — white fill, blue accent border on hover
function AccountCard({ account }: { account: (typeof mockAccounts)[0] }) {
  const isProfit = account.profit >= 0;
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white rounded-2xl border-2 border-gray-200 hover:border-blue-300 hover:shadow-md p-4 transition-all duration-200 cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className={cn(
              "text-[10px] font-bold px-2 py-0.5 rounded-lg border",
              account.type === "Real"
                ? "bg-blue-50 text-blue-700 border-blue-200"
                : "bg-purple-50 text-purple-700 border-purple-200"
            )}>
              {account.type}
            </span>
            <span className="text-[11px] text-gray-400 font-medium">{account.leverage}</span>
          </div>
          <p className="text-sm font-mono font-bold text-gray-800 mt-1.5">{account.id}</p>
        </div>
        <div className={cn(
          "text-sm font-bold px-2 py-0.5 rounded-lg",
          isProfit
            ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
            : "bg-red-50 text-red-600 border border-red-200"
        )}>
          {isProfit ? "+" : ""}{formatPercent(account.profit)}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-2">
        <div className="bg-gray-50 rounded-xl p-2.5">
          <p className="text-[10px] text-gray-400 font-medium mb-0.5">Balance</p>
          <p className="text-sm font-bold text-gray-800">{formatCurrency(account.balance)}</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-2.5">
          <p className="text-[10px] text-gray-400 font-medium mb-0.5">Equity</p>
          <p className="text-sm font-bold text-gray-800">{formatCurrency(account.equity)}</p>
        </div>
      </div>
      <p className="text-[11px] text-gray-400">{account.server}</p>
    </motion.div>
  );
}

// Signal Card — clean row with confidence badge
function SignalCard({ signal }: { signal: (typeof mockSignals)[0] }) {
  const isBuy = signal.direction === "BUY";
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-100 hover:border-blue-200 hover:shadow-sm transition-all duration-200 cursor-pointer">
      <div className={cn(
        "text-[11px] font-bold px-2.5 py-1 rounded-lg border shrink-0",
        isBuy
          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
          : "bg-red-50 text-red-700 border-red-200"
      )}>
        {signal.direction}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-gray-800">{signal.symbol}</span>
          <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded-md">{signal.timeframe}</span>
        </div>
        <p className="text-xs text-gray-400 mt-0.5">Entry: {signal.entry}</p>
      </div>
      <div className="text-right shrink-0">
        <div className={cn(
          "text-sm font-bold px-2 py-0.5 rounded-lg mb-0.5",
          signal.confidence >= 80
            ? "bg-blue-600 text-white"
            : "bg-blue-50 text-blue-700 border border-blue-200"
        )}>
          {signal.confidence}%
        </div>
        <div className="text-[10px] text-gray-400">{signal.time}</div>
      </div>
    </div>
  );
}

// Trader Card — clean row with ROI badge
function TraderCard({ trader }: { trader: (typeof mockTraders)[0] }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-100 hover:border-blue-200 hover:shadow-sm transition-all duration-200 cursor-pointer">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-sm">
        {trader.avatar}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-gray-800 truncate">{trader.name}</p>
        <p className="text-xs text-gray-400">{trader.followers.toLocaleString()} followers</p>
      </div>
      <div className="text-right shrink-0">
        <div className="text-sm font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-lg">
          +{trader.roi}%
        </div>
        <div className="text-[10px] text-gray-400 mt-0.5">DD {trader.drawdown}%</div>
      </div>
    </div>
  );
}

// ─── Main Dashboard Page ───────────────────────────────────
export default function DashboardPage() {
  const { wallet, user } = usePortalStore();
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title={`${greeting}, ${user?.name?.split(" ")[0]} 👋`}
        description="Here's your portfolio overview for today."
      />

      {/* Wallet Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Balance"
          value={formatCurrency(wallet.total)}
          change={3.24}
          changeLabel="vs yesterday"
          icon={Wallet}
          delay={0}
          progressColor="blue"
        />
        <StatCard
          title="Equity"
          value={formatCurrency(wallet.equity)}
          change={4.81}
          changeLabel="vs yesterday"
          icon={TrendingUp}
          delay={0.05}
          progressColor="green"
        />
        <StatCard
          title="Available"
          value={formatCurrency(wallet.available)}
          icon={ArrowDownToLine}
          delay={0.1}
          progressColor="purple"
        />
        <StatCard
          title="Frozen"
          value={formatCurrency(wallet.frozen)}
          icon={Activity}
          delay={0.15}
          progressColor="orange"
        />
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.35 }}
        className="bg-white rounded-2xl border border-gray-200 p-5"
      >
        <h2 className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-widest">
          Quick Actions
        </h2>
        <div className="grid grid-cols-4 gap-3">
          <QuickAction
            icon={ArrowDownToLine}
            label="Deposit"
            href="/portal/wallet/deposit"
            iconBg="bg-blue-50"
            iconColor="text-blue-600"
            borderColor="border-blue-200"
            hoverBorder="hover:border-blue-500"
          />
          <QuickAction
            icon={ArrowUpFromLine}
            label="Withdraw"
            href="/portal/wallet/withdraw"
            iconBg="bg-purple-50"
            iconColor="text-purple-600"
            borderColor="border-purple-200"
            hoverBorder="hover:border-purple-500"
          />
          <QuickAction
            icon={Plus}
            label="Open Account"
            href="/portal/trading/open-account"
            iconBg="bg-amber-50"
            iconColor="text-amber-600"
            borderColor="border-amber-200"
            hoverBorder="hover:border-amber-500"
          />
          <QuickAction
            icon={ArrowLeftRight}
            label="Transfer"
            href="/portal/wallet/transfer"
            iconBg="bg-emerald-50"
            iconColor="text-emerald-600"
            borderColor="border-emerald-200"
            hoverBorder="hover:border-emerald-500"
          />
        </div>
      </motion.div>

      {/* Main grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Left: Accounts + Tasks */}
        <div className="xl:col-span-2 space-y-5">
          {/* Trading Accounts */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-white rounded-2xl border border-gray-200 p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-800 text-sm">My Accounts</h2>
              <Link
                href="/portal/trading/accounts"
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-0.5 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-lg hover:bg-blue-100 transition-colors"
              >
                View all <ChevronRight size={12} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {mockAccounts.map((acc) => (
                <AccountCard key={acc.id} account={acc} />
              ))}
            </div>
          </motion.div>

          {/* Tasks */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl border border-gray-200 p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-800 text-sm flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center">
                  <CheckSquare size={13} className="text-blue-600" />
                </div>
                Tasks & Rewards
              </h2>
              <Link
                href="/portal/activity/tasks"
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-0.5 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-lg hover:bg-blue-100 transition-colors"
              >
                View all <ChevronRight size={12} />
              </Link>
            </div>
            <div className="space-y-2">
              {mockTasks.map((task) => {
                const TaskIcon = task.icon;
                return (
                  <Link key={task.id} href={task.href}>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100 hover:border-blue-200 hover:bg-white hover:shadow-sm transition-all duration-200 cursor-pointer group">
                      <div className="w-9 h-9 rounded-xl bg-white border border-blue-200 flex items-center justify-center shrink-0">
                        <TaskIcon size={15} className="text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1.5">
                          <p className="text-sm font-semibold text-gray-800">{task.title}</p>
                          <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-lg shrink-0">{task.reward}</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-gray-200">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-700"
                            style={{ width: `${task.progress}%` }}
                          />
                        </div>
                        <p className="text-[11px] text-gray-400 mt-1">{task.progress}% complete</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Right: Signals + Copy Trading + Announcements */}
        <div className="space-y-5">
          {/* AI Signals */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl border border-gray-200 p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-800 text-sm flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center">
                  <Zap size={13} className="text-amber-500" />
                </div>
                AI Signals
              </h2>
              <Link
                href="/portal/ai-signals/feed"
                className="text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-0.5"
              >
                More <ChevronRight size={12} />
              </Link>
            </div>
            <div className="space-y-2">
              {mockSignals.map((signal) => (
                <SignalCard key={signal.id} signal={signal} />
              ))}
            </div>
          </motion.div>

          {/* Copy Trading */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="bg-white rounded-2xl border border-gray-200 p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-800 text-sm flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center">
                  <Copy size={13} className="text-purple-600" />
                </div>
                Top Traders
              </h2>
              <Link
                href="/portal/copy-trading/discover"
                className="text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-0.5"
              >
                More <ChevronRight size={12} />
              </Link>
            </div>
            <div className="space-y-2">
              {mockTraders.map((trader) => (
                <TraderCard key={trader.id} trader={trader} />
              ))}
            </div>
          </motion.div>

          {/* Announcements */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl border border-gray-200 p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-800 text-sm flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center">
                  <Bell size={13} className="text-red-500" />
                </div>
                Announcements
              </h2>
            </div>
            <div className="space-y-3">
              {mockAnnouncements.map((ann) => (
                <div
                  key={ann.id}
                  className={cn(
                    "p-3 rounded-xl border-2 cursor-pointer transition-all duration-200",
                    ann.type === "promo"
                      ? "bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 hover:border-amber-400"
                      : "bg-gray-50 border-gray-200 hover:border-blue-200"
                  )}
                >
                  <div className="flex items-start gap-2.5">
                    <div className={cn(
                      "w-2 h-2 rounded-full mt-1.5 shrink-0",
                      ann.type === "promo" ? "bg-amber-500" : "bg-blue-500"
                    )} />
                    <div>
                      <p className="text-sm font-bold text-gray-800">{ann.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{ann.desc}</p>
                      <p className="text-[11px] text-gray-400 mt-1.5">{ann.time}</p>
                    </div>
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
