"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Clock, LogIn, LogOut, Settings, Shield, Wallet,
  TrendingUp, AlertCircle, CheckCircle2, Filter, Search,
  ChevronDown, ArrowRightLeft, User
} from "lucide-react";
import { PageHeader } from "@/components/portal/widgets/PageHeader";
import { cn } from "@/lib/utils";

const mockActivities = [
  { id: 1, type: "login", action: "Logged in", device: "Chrome / MacOS", location: "Singapore", time: "2025-03-28 14:32", status: "success" },
  { id: 2, type: "trade", action: "Opened BUY XAUUSD", details: "0.50 lots @ 2334.50", time: "2025-03-28 14:15", status: "success" },
  { id: 3, type: "wallet", action: "Deposit", details: "$5,000 USDT TRC20", time: "2025-03-28 10:00", status: "success" },
  { id: 4, type: "settings", action: "Changed password", device: "Chrome / MacOS", time: "2025-03-27 16:45", status: "success" },
  { id: 5, type: "trade", action: "Closed SELL EURUSD", details: "P&L: +$125.00", time: "2025-03-27 14:20", status: "success" },
  { id: 6, type: "security", action: "2FA enabled", device: "iPhone 15", time: "2025-03-26 09:30", status: "success" },
  { id: 7, type: "login", action: "Failed login attempt", device: "Firefox / Windows", location: "Unknown", time: "2025-03-25 22:15", status: "warning" },
  { id: 8, type: "wallet", action: "Withdrawal", details: "$1,200 USDT ERC20", time: "2025-03-24 11:00", status: "success" },
];

const typeConfig: Record<string, { icon: any; color: string; bg: string; border: string }> = {
  login:    { icon: LogIn,       color: "text-blue-700",    bg: "bg-blue-50",    border: "border-blue-200" },
  logout:   { icon: LogOut,      color: "text-gray-700",    bg: "bg-gray-100",   border: "border-gray-200" },
  trade:    { icon: TrendingUp,  color: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200" },
  wallet:   { icon: Wallet,      color: "text-amber-700",   bg: "bg-amber-50",   border: "border-amber-200" },
  settings: { icon: Settings,    color: "text-purple-700",  bg: "bg-purple-50",  border: "border-purple-200" },
  security: { icon: Shield,      color: "text-indigo-700",  bg: "bg-indigo-50",  border: "border-indigo-200" },
};

const statusConfig: Record<string, { icon: any; className: string }> = {
  success: { icon: CheckCircle2, className: "text-emerald-600" },
  warning: { icon: AlertCircle,  className: "text-amber-600" },
  error:   { icon: AlertCircle,  className: "text-red-600" },
};

export default function ActivityPage() {
  const [filter, setFilter] = useState<"all" | "login" | "trade" | "wallet" | "security">("all");

  const filtered = mockActivities.filter((a) => filter === "all" ? true : a.type === filter);

  return (
    <div className="space-y-6">
      <PageHeader title="Activity Log" description="Track all account activities and security events." />

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2">
          {(["all", "login", "trade", "wallet", "security"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-4 py-1.5 rounded-xl text-sm font-semibold transition-all border-2",
                filter === f
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
              )}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              placeholder="Search activities..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border-2 border-gray-200 text-sm focus:outline-none focus:border-blue-400 transition-colors"
            />
          </div>
        </div>
        <button className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-white border-2 border-gray-200 px-3 py-2 rounded-xl hover:border-gray-300 transition-colors">
          <Clock size={14} /> Last 7 Days
        </button>
      </div>

      {/* Activity list */}
      <div className="rounded-2xl bg-white border-2 border-gray-200 overflow-hidden">
        <div className="divide-y divide-gray-100">
          {filtered.map((activity, i) => {
            const type = typeConfig[activity.type] || typeConfig.login;
            const TypeIcon = type.icon;
            const status = statusConfig[activity.status];
            const StatusIcon = status.icon;
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className="flex items-center gap-4 p-4 hover:bg-blue-50/30 transition-colors"
              >
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center border-2 shrink-0", type.bg, type.border)}>
                  <TypeIcon size={18} className={type.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-gray-900 text-sm">{activity.action}</p>
                    <StatusIcon size={14} className={status.className} />
                  </div>
                  {activity.details && (
                    <p className="text-xs text-gray-600 mt-0.5">{activity.details}</p>
                  )}
                  {(activity.device || activity.location) && (
                    <p className="text-xs text-gray-400 mt-0.5">
                      {activity.device}{activity.location && ` · ${activity.location}`}
                    </p>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
