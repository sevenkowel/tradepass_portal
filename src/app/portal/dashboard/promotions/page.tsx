"use client";

import { motion } from "framer-motion";
import {
  Gift,
  TrendingUp,
  Users,
  Wallet,
  Clock,
  ChevronRight,
  Sparkles,
  Percent,
  Crown,
  Zap,
} from "lucide-react";
import { PageHeader } from "@/components/portal/widgets/PageHeader";
import { cn } from "@/lib/utils";
import Link from "next/link";

// ─── Mock Data ─────────────────────────────────────────────
const activePromotions = [
  {
    id: 1,
    title: "Summer Trading Bonus",
    subtitle: "Up to 30% Deposit Bonus",
    description: "Deposit during summer season and get up to 30% bonus on your deposit amount. Perfect time to boost your trading capital!",
    type: "deposit",
    bonus: "30%",
    maxBonus: "$3,000",
    minDeposit: "$100",
    validUntil: "Aug 31, 2025",
    icon: Percent,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    gradient: "from-amber-500 to-orange-500",
    featured: true,
  },
  {
    id: 2,
    title: "Welcome Bonus",
    subtitle: "100% First Deposit Match",
    description: "New to TradePass? Double your first deposit with our 100% welcome bonus up to $1,000.",
    type: "welcome",
    bonus: "100%",
    maxBonus: "$1,000",
    minDeposit: "$50",
    validUntil: "Ongoing",
    icon: Gift,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    gradient: "from-blue-500 to-blue-700",
    featured: false,
  },
  {
    id: 3,
    title: "Referral Rewards",
    subtitle: "Earn $30 Per Friend",
    description: "Invite friends to TradePass and earn $30 for each friend who completes KYC and makes a deposit.",
    type: "referral",
    bonus: "$30",
    maxBonus: "Unlimited",
    minDeposit: "N/A",
    validUntil: "Ongoing",
    icon: Users,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    gradient: "from-emerald-500 to-emerald-700",
    featured: false,
  },
  {
    id: 4,
    title: "VIP Cashback",
    subtitle: "Up to 15% Trading Rebate",
    description: "Join our VIP program and receive weekly cashback on your trading volume. Higher tier = higher rebate!",
    type: "vip",
    bonus: "15%",
    maxBonus: "Unlimited",
    minDeposit: "$5,000",
    validUntil: "Ongoing",
    icon: Crown,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    gradient: "from-purple-500 to-purple-700",
    featured: false,
  },
];

const upcomingPromotions = [
  {
    id: 5,
    title: "Trading Competition",
    subtitle: "$50,000 Prize Pool",
    description: "Compete with traders worldwide for a share of $50,000 in prizes.",
    startDate: "Sep 1, 2025",
    icon: TrendingUp,
    iconBg: "bg-red-50",
    iconColor: "text-red-600",
  },
  {
    id: 6,
    title: "Zero Fee Week",
    subtitle: "No Trading Fees",
    description: "Trade with zero commission fees for one full week!",
    startDate: "Oct 15, 2025",
    icon: Zap,
    iconBg: "bg-cyan-50",
    iconColor: "text-cyan-600",
  },
];

const myRewards = [
  {
    id: 1,
    title: "Welcome Bonus",
    amount: "$500",
    status: "active",
    claimedAt: "Jul 15, 2025",
    expiresAt: "No expiry",
  },
  {
    id: 2,
    title: "Summer Trading Bonus",
    amount: "$300",
    status: "pending",
    progress: 60,
    requirement: "Complete $10K volume",
  },
];

// ─── Components ────────────────────────────────────────────
function PromotionCard({ promo }: { promo: (typeof activePromotions)[0] }) {
  const Icon = promo.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "bg-white rounded-2xl border-2 overflow-hidden transition-all duration-200 hover:shadow-lg",
        promo.featured ? "border-amber-300" : "border-gray-200 hover:border-blue-300"
      )}
    >
      {promo.featured && (
        <div className={cn("h-1.5 w-full bg-gradient-to-r", promo.gradient)} />
      )}
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div
            className={cn(
              "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0",
              promo.iconBg,
              "border-2"
            )}
          >
            <Icon size={26} className={promo.iconColor} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-gray-800">{promo.title}</h3>
              {promo.featured && (
                <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                  FEATURED
                </span>
              )}
            </div>
            <p className="text-sm font-semibold text-blue-600">{promo.subtitle}</p>
            <p className="text-sm text-gray-500 mt-2">{promo.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-5">
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <p className="text-xs text-gray-400 mb-1">Bonus</p>
            <p className="text-lg font-bold text-gray-800">{promo.bonus}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <p className="text-xs text-gray-400 mb-1">Max Bonus</p>
            <p className="text-lg font-bold text-gray-800">{promo.maxBonus}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <p className="text-xs text-gray-400 mb-1">Min Deposit</p>
            <p className="text-lg font-bold text-gray-800">{promo.minDeposit}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-5">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Clock size={12} />
            <span>Valid until {promo.validUntil}</span>
          </div>
          <button
            className={cn(
              "text-sm font-semibold text-white px-4 py-2 rounded-xl transition-all duration-200",
              "bg-gradient-to-r hover:shadow-md",
              promo.gradient
            )}
          >
            Participate
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function UpcomingCard({ promo }: { promo: (typeof upcomingPromotions)[0] }) {
  const Icon = promo.icon;
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", promo.iconBg)}>
        <Icon size={22} className={promo.iconColor} />
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-gray-800">{promo.title}</h4>
        <p className="text-sm text-blue-600 font-medium">{promo.subtitle}</p>
        <p className="text-xs text-gray-400 mt-1">{promo.description}</p>
      </div>
      <div className="text-right">
        <p className="text-xs text-gray-400">Starts</p>
        <p className="text-sm font-semibold text-gray-600">{promo.startDate}</p>
      </div>
    </div>
  );
}

function RewardCard({ reward }: { reward: (typeof myRewards)[0] }) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-white border-2 border-gray-200">
      <div className="w-12 h-12 rounded-xl bg-blue-50 border-2 border-blue-200 flex items-center justify-center">
        <Wallet size={22} className="text-blue-600" />
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-gray-800">{reward.title}</h4>
        {reward.status === "active" ? (
          <p className="text-xs text-gray-400">Claimed on {reward.claimedAt}</p>
        ) : (
          <div className="mt-2">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-gray-500">{reward.requirement}</span>
              <span className="text-blue-600 font-medium">{reward.progress}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-blue-500"
                style={{ width: `${reward.progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
      <div className="text-right">
        <p className="text-xl font-bold text-gray-800">{reward.amount}</p>
        <span
          className={cn(
            "text-xs px-2 py-0.5 rounded-full",
            reward.status === "active"
              ? "bg-emerald-50 text-emerald-600"
              : "bg-amber-50 text-amber-600"
          )}
        >
          {reward.status === "active" ? "Active" : "Pending"}
        </span>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────
export default function PromotionsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Promotions & Rewards"
        description="Discover exclusive offers and bonuses to maximize your trading experience"
      />

      {/* My Rewards */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border-2 border-gray-200 p-5"
      >
        <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center">
            <Sparkles size={14} className="text-blue-600" />
          </div>
          My Rewards
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {myRewards.map((reward) => (
            <RewardCard key={reward.id} reward={reward} />
          ))}
        </div>
      </motion.div>

      {/* Active Promotions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {activePromotions.map((promo, index) => (
          <motion.div
            key={promo.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <PromotionCard promo={promo} />
          </motion.div>
        ))}
      </div>

      {/* Upcoming */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl border-2 border-gray-200 p-5"
      >
        <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center">
            <Clock size={14} className="text-purple-600" />
          </div>
          Coming Soon
        </h2>
        <div className="space-y-3">
          {upcomingPromotions.map((promo) => (
            <UpcomingCard key={promo.id} promo={promo} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
