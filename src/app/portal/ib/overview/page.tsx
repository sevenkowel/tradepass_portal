"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  DollarSign,
  Users,
  TrendingUp,
  Share2,
  Copy,
  Check,
  ChevronRight,
  Link as LinkIcon,
} from "lucide-react";
import { StatCard } from "@/components/portal/widgets/StatCard";
import { PageHeader } from "@/components/portal/widgets/PageHeader";
import { formatCurrency, cn } from "@/lib/utils";
import Link from "next/link";

const mockIBStats = {
  totalEarnings: 12840.5,
  thisMonth: 2340.0,
  activeClients: 48,
  totalClients: 124,
  pendingCommission: 890.0,
  tier: "Silver IB",
};

const mockRecentClients = [
  { id: 1, name: "John D.", registered: "2025-03-28", deposit: 5000, trades: 12, commission: 42.5, status: "active" },
  { id: 2, name: "Sarah M.", registered: "2025-03-26", deposit: 2000, trades: 5, commission: 16.8, status: "active" },
  { id: 3, name: "Mike T.", registered: "2025-03-24", deposit: 10000, trades: 28, commission: 96.0, status: "active" },
  { id: 4, name: "Emma L.", registered: "2025-03-20", deposit: 0, trades: 0, commission: 0, status: "pending" },
];

const mockCommissionData = [
  { date: "Mar 25", amount: 320 },
  { date: "Mar 26", amount: 480 },
  { date: "Mar 27", amount: 210 },
  { date: "Mar 28", amount: 540 },
  { date: "Mar 29", amount: 390 },
  { date: "Mar 30", amount: 620 },
  { date: "Mar 31", amount: 280 },
];

export default function IBOverviewPage() {
  const [copied, setCopied] = useState(false);
  const referralLink = "https://tradepass.io/register?ref=TC8843201";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const maxAmount = Math.max(...mockCommissionData.map((d) => d.amount));

  return (
    <div className="space-y-6">
      <PageHeader
        title="IB / Referral"
        description="Track your referral performance and commission earnings."
        actions={
          <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 border-2 border-blue-200">
            {mockIBStats.tier}
          </span>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Earnings" value={formatCurrency(mockIBStats.totalEarnings)} change={8.4} icon={DollarSign} progressColor="blue" />
        <StatCard title="This Month" value={formatCurrency(mockIBStats.thisMonth)} change={12.1} icon={TrendingUp} progressColor="green" delay={0.05} />
        <StatCard title="Active Clients" value={String(mockIBStats.activeClients)} icon={Users} progressColor="purple" delay={0.1} />
        <StatCard title="Pending Payout" value={formatCurrency(mockIBStats.pendingCommission)} icon={DollarSign} progressColor="orange" delay={0.15} />
      </div>

      {/* Referral link */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 p-5"
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="font-bold text-gray-800 mb-1">Your Referral Link</h2>
            <p className="text-sm text-gray-500">Share this link to earn commission on every client you refer.</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center">
            <Share2 size={16} className="text-blue-600" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 p-3 rounded-xl bg-white border-2 border-blue-200">
            <LinkIcon size={14} className="text-blue-400 shrink-0" />
            <span className="text-sm text-gray-600 truncate flex-1">{referralLink}</span>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleCopy}
            className={cn(
              "flex items-center gap-1.5 px-4 py-3 rounded-xl text-sm font-bold transition-all shadow-sm",
              copied
                ? "bg-emerald-600 text-white"
                : "bg-blue-600 text-white hover:bg-blue-700"
            )}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copied!" : "Copy"}
          </motion.button>
        </div>
      </motion.div>

      {/* Main grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Commission chart */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="xl:col-span-2 rounded-2xl bg-white border border-gray-200 p-5"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-gray-800">Commission (7 Days)</h2>
            <span className="text-sm font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
              +{formatCurrency(mockCommissionData.reduce((s, d) => s + d.amount, 0))}
            </span>
          </div>
          {/* Bar chart */}
          <div className="flex items-end gap-2 h-40">
            {mockCommissionData.map((d, i) => (
              <div key={d.date} className="flex-1 flex flex-col items-center gap-1.5">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(d.amount / maxAmount) * 100}%` }}
                  transition={{ delay: 0.3 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full rounded-lg bg-gradient-to-t from-blue-600 to-blue-400 min-h-[4px]"
                />
                <span className="text-[10px] text-gray-400 font-medium">{d.date.split(" ")[1]}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent clients */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl bg-white border border-gray-200 p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-800">Recent Clients</h2>
            <Link
              href="/portal/ib/clients"
              className="text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-0.5"
            >
              All <ChevronRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {mockRecentClients.map((client) => (
              <div key={client.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-50 border border-gray-100 hover:border-blue-200 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-sm">
                  {client.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-800">{client.name}</span>
                    <span className={cn(
                      "text-xs font-bold px-2 py-0.5 rounded-lg border",
                      client.status === "active"
                        ? "text-emerald-700 bg-emerald-50 border-emerald-200"
                        : "text-gray-400 bg-gray-50 border-gray-200"
                    )}>
                      {client.status === "active" ? `+$${client.commission}` : "Pending"}
                    </span>
                  </div>
                  <div className="text-[11px] text-gray-400 mt-0.5">
                    {client.trades} trades · ${client.deposit.toLocaleString()} deposit
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
