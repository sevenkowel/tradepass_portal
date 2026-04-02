"use client";

import { motion } from "framer-motion";
import {
  History,
  Gift,
  CheckCircle2,
  Clock,
  ChevronRight,
  Filter,
  Download,
} from "lucide-react";
import { PageHeader } from "@/components/portal/widgets/PageHeader";
import { cn, formatCurrency } from "@/lib/utils";
import { useState } from "react";

// ─── Mock Data ─────────────────────────────────────────────
const rewardHistory = [
  {
    id: 1,
    type: "deposit_bonus",
    title: "Welcome Bonus",
    description: "First deposit bonus",
    amount: 500,
    currency: "USD",
    status: "claimed",
    claimedAt: "Jul 15, 2025",
    expiresAt: null,
    icon: Gift,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    id: 2,
    type: "trading_rebate",
    title: "Trading Rebate",
    description: "Weekly cashback",
    amount: 125.5,
    currency: "USD",
    status: "claimed",
    claimedAt: "Jul 20, 2025",
    expiresAt: null,
    icon: Gift,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    id: 3,
    type: "referral",
    title: "Referral Bonus",
    description: "Friend invitation reward",
    amount: 30,
    currency: "USD",
    status: "pending",
    claimedAt: null,
    expiresAt: "Aug 15, 2025",
    icon: Gift,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    id: 4,
    type: "kyc",
    title: "KYC Bonus",
    description: "Verification reward",
    amount: 50,
    currency: "USD",
    status: "claimed",
    claimedAt: "Jul 10, 2025",
    expiresAt: null,
    icon: Gift,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    id: 5,
    type: "promotion",
    title: "Summer Bonus",
    description: "Seasonal promotion",
    amount: 300,
    currency: "USD",
    status: "expired",
    claimedAt: null,
    expiresAt: "Jul 1, 2025",
    icon: Gift,
    iconBg: "bg-gray-50",
    iconColor: "text-gray-400",
  },
];

const filterOptions = [
  { id: "all", label: "All Rewards" },
  { id: "claimed", label: "Claimed" },
  { id: "pending", label: "Pending" },
  { id: "expired", label: "Expired" },
];

// ─── Components ────────────────────────────────────────────
function RewardCard({ reward }: { reward: (typeof rewardHistory)[0] }) {
  const Icon = reward.icon;
  return (
    <div
      className={cn(
        "bg-white rounded-2xl border-2 p-5 transition-all",
        reward.status === "expired"
          ? "border-gray-200 opacity-60"
          : "border-gray-200 hover:border-blue-300"
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
            reward.iconBg
          )}
        >
          <Icon size={22} className={reward.iconColor} />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-gray-800">{reward.title}</h3>
              <p className="text-sm text-gray-500">{reward.description}</p>
            </div>
            <div className="text-right">
              <p
                className={cn(
                  "text-lg font-bold",
                  reward.status === "expired" ? "text-gray-400" : "text-gray-800"
                )}
              >
                {formatCurrency(reward.amount)}
              </p>
              <span
                className={cn(
                  "text-xs px-2 py-0.5 rounded-full",
                  reward.status === "claimed"
                    ? "bg-emerald-50 text-emerald-600"
                    : reward.status === "pending"
                    ? "bg-amber-50 text-amber-600"
                    : "bg-gray-100 text-gray-500"
                )}
              >
                {reward.status.charAt(0).toUpperCase() + reward.status.slice(1)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
            {reward.claimedAt && (
              <>
                <CheckCircle2 size={12} className="text-emerald-500" />
                <span>Claimed on {reward.claimedAt}</span>
              </>
            )}
            {reward.expiresAt && reward.status === "pending" && (
              <>
                <Clock size={12} className="text-amber-500" />
                <span>Expires {reward.expiresAt}</span>
              </>
            )}
            {reward.status === "expired" && (
              <>
                <Clock size={12} className="text-gray-400" />
                <span>Expired on {reward.expiresAt}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────
export default function ActivityHistoryPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredRewards =
    activeFilter === "all"
      ? rewardHistory
      : rewardHistory.filter((r) => r.status === activeFilter);

  const totalClaimed = rewardHistory
    .filter((r) => r.status === "claimed")
    .reduce((sum, r) => sum + r.amount, 0);

  const totalPending = rewardHistory
    .filter((r) => r.status === "pending")
    .reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reward History"
        description="Track all your bonuses and rewards"
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border-2 border-gray-200 p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border-2 border-blue-200 flex items-center justify-center">
              <History size={18} className="text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{rewardHistory.length}</p>
              <p className="text-xs text-gray-500">Total Rewards</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-white rounded-2xl border-2 border-gray-200 p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center">
              <CheckCircle2 size={18} className="text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {formatCurrency(totalClaimed)}
              </p>
              <p className="text-xs text-gray-500">Claimed</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border-2 border-gray-200 p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border-2 border-amber-200 flex items-center justify-center">
              <Clock size={18} className="text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {formatCurrency(totalPending)}
              </p>
              <p className="text-xs text-gray-500">Pending</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-2xl border-2 border-gray-200 p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 border-2 border-purple-200 flex items-center justify-center">
              <Gift size={18} className="text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">3</p>
              <p className="text-xs text-gray-500">Available</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2">
        {filterOptions.map((opt) => (
          <button
            key={opt.id}
            onClick={() => setActiveFilter(opt.id)}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-medium transition-all border-2",
              activeFilter === opt.id
                ? "bg-blue-50 text-blue-700 border-blue-200"
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
            )}
          >
            {opt.label}
          </button>
        ))}
        <button className="ml-auto flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-gray-600 bg-white border-2 border-gray-200 hover:border-gray-300 transition-all">
          <Download size={14} />
          Export
        </button>
      </div>

      {/* Rewards List */}
      <div className="space-y-3">
        {filteredRewards.map((reward, index) => (
          <motion.div
            key={reward.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <RewardCard reward={reward} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
