"use client";

import { motion } from "framer-motion";
import {
  Zap,
  Crown,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  Clock,
  BarChart3,
} from "lucide-react";
import { PageHeader } from "@/components/portal/widgets/PageHeader";
import { cn } from "@/lib/utils";

// ─── Mock Data ─────────────────────────────────────────────
const usageData = {
  dailyQuota: 10,
  usedToday: 6,
  remainingToday: 4,
  totalGenerated: 128,
  savedSignals: 15,
  plan: "free", // free | pro | vip
};

const plans = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "forever",
    features: [
      "5 signals per day",
      "Basic technical analysis",
      "Major pairs only",
      "Email support",
    ],
    limitations: ["No saved signals", "No custom timeframes"],
    current: true,
    icon: Zap,
    iconBg: "bg-gray-50",
    iconColor: "text-gray-600",
  },
  {
    id: "pro",
    name: "Pro",
    price: "$29",
    period: "month",
    features: [
      "50 signals per day",
      "Advanced AI models",
      "All currency pairs",
      "Save up to 50 signals",
      "Custom timeframes",
      "Priority support",
    ],
    limitations: [],
    current: false,
    icon: Sparkles,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    popular: true,
  },
  {
    id: "vip",
    name: "VIP",
    price: "$99",
    period: "month",
    features: [
      "Unlimited signals",
      "Premium AI models",
      "All markets (FX, Crypto, Stocks)",
      "Unlimited saved signals",
      "API access",
      "Dedicated account manager",
      "Custom alerts",
    ],
    limitations: [],
    current: false,
    icon: Crown,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
];

// ─── Components ────────────────────────────────────────────
function PlanCard({ plan }: { plan: (typeof plans)[0] }) {
  const Icon = plan.icon;
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={cn(
        "relative rounded-2xl border-2 p-5 transition-all duration-200",
        plan.current
          ? "border-blue-500 bg-blue-50/30"
          : plan.popular
          ? "border-amber-300 hover:shadow-lg"
          : "border-gray-200 hover:border-blue-300 hover:shadow-md"
      )}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-full">
          MOST POPULAR
        </div>
      )}
      {plan.current && (
        <div className="absolute -top-3 left-4 bg-blue-500 text-white text-[10px] font-bold px-3 py-1 rounded-full">
          CURRENT PLAN
        </div>
      )}

      <div className="flex items-center gap-3 mb-4">
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", plan.iconBg)}>
          <Icon size={24} className={plan.iconColor} />
        </div>
        <div>
          <h3 className="font-bold text-gray-800">{plan.name}</h3>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-gray-800">{plan.price}</span>
            <span className="text-sm text-gray-400">/{plan.period}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        {plan.features.map((feature, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
            <span className="text-sm text-gray-600">{feature}</span>
          </div>
        ))}
        {plan.limitations.map((limit, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <XCircle size={14} className="text-gray-300 shrink-0" />
            <span className="text-sm text-gray-400">{limit}</span>
          </div>
        ))}
      </div>

      <button
        className={cn(
          "w-full py-2.5 rounded-xl font-semibold text-sm transition-colors",
          plan.current
            ? "bg-gray-100 text-gray-500 cursor-default"
            : plan.popular
            ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-md"
            : "bg-blue-600 text-white hover:bg-blue-700"
        )}
        disabled={plan.current}
      >
        {plan.current ? "Current Plan" : "Upgrade"}
      </button>
    </motion.div>
  );
}

// ─── Main Page ─────────────────────────────────────────────
export default function LimitsPage() {
  const progressPercent = (usageData.usedToday / usageData.dailyQuota) * 100;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Usage Limits"
        description="Track your AI signal usage and upgrade for more features"
      />

      {/* Usage Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border-2 border-gray-200 p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border-2 border-blue-200 flex items-center justify-center">
              <Zap size={18} className="text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{usageData.remainingToday}</p>
              <p className="text-xs text-gray-500">Remaining Today</p>
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
              <BarChart3 size={18} className="text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{usageData.usedToday}</p>
              <p className="text-xs text-gray-500">Used Today</p>
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
            <div className="w-10 h-10 rounded-xl bg-purple-50 border-2 border-purple-200 flex items-center justify-center">
              <Sparkles size={18} className="text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{usageData.totalGenerated}</p>
              <p className="text-xs text-gray-500">Total Generated</p>
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
            <div className="w-10 h-10 rounded-xl bg-amber-50 border-2 border-amber-200 flex items-center justify-center">
              <Clock size={18} className="text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{usageData.dailyQuota}</p>
              <p className="text-xs text-gray-500">Daily Quota</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl border-2 border-gray-200 p-5"
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-gray-800">Daily Usage</h2>
          <span className="text-sm text-gray-500">
            {usageData.usedToday} / {usageData.dailyQuota} signals
          </span>
        </div>
        <div className="w-full h-3 rounded-full bg-gray-100">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-700",
              progressPercent >= 90 ? "bg-red-500" : progressPercent >= 70 ? "bg-amber-500" : "bg-blue-500"
            )}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 mt-3">
          Your quota resets at midnight UTC. Upgrade to Pro for 50 signals per day.
        </p>
      </motion.div>

      {/* Upgrade Plans */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="font-bold text-gray-800 mb-4">Upgrade Your Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
