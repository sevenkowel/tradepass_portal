"use client";

import { motion } from "framer-motion";
import {
  Users, UserPlus, TrendingUp, DollarSign,
  ChevronRight, CheckCircle2, Star
} from "lucide-react";
import { PageHeader } from "@/components/portal/widgets/PageHeader";
import { cn } from "@/lib/utils";

const mockSubIBs = [
  { id: "SIB001", name: "Alpha Partners", clients: 12, volume: 450000, commission: 450, tier: "Gold" },
  { id: "SIB002", name: "Beta Traders", clients: 8, volume: 280000, commission: 280, tier: "Silver" },
  { id: "SIB003", name: "Gamma Group", clients: 5, volume: 150000, commission: 150, tier: "Bronze" },
];

export default function SubIBPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Sub-IB Network" description="Manage your sub-introducing brokers and their performance." />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Sub-IBs", value: "3", color: "blue" },
          { label: "Total Clients", value: "25", color: "emerald" },
          { label: "Network Volume", value: "$880K", color: "indigo" },
          { label: "Your Override", value: "$880", color: "amber" },
        ].map(({ label, value, color }) => (
          <div key={label} className={cn(
            "rounded-2xl bg-white border-2 p-4",
            color === "blue" && "border-blue-200",
            color === "emerald" && "border-emerald-200",
            color === "indigo" && "border-indigo-200",
            color === "amber" && "border-amber-200",
          )}>
            <p className="text-xs font-medium text-gray-500 mb-1">{label}</p>
            <p className={cn(
              "text-xl font-bold",
              color === "blue" && "text-blue-700",
              color === "emerald" && "text-emerald-700",
              color === "indigo" && "text-indigo-700",
              color === "amber" && "text-amber-700",
            )}>{value}</p>
          </div>
        ))}
      </div>

      {/* Sub-IB cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockSubIBs.map((sub, i) => (
          <motion.div
            key={sub.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl bg-white border-2 border-gray-200 p-5 hover:border-blue-300 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-lg font-bold text-blue-700">
                  {sub.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{sub.name}</p>
                  <p className="text-xs text-gray-500">{sub.id}</p>
                </div>
              </div>
              <span className={cn(
                "text-xs font-bold px-2 py-1 rounded-lg border",
                sub.tier === "Gold" && "bg-amber-50 text-amber-700 border-amber-200",
                sub.tier === "Silver" && "bg-gray-100 text-gray-700 border-gray-200",
                sub.tier === "Bronze" && "bg-orange-50 text-orange-700 border-orange-200",
              )}>
                {sub.tier}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="text-center p-2 rounded-xl bg-gray-50 border border-gray-100">
                <p className="text-[10px] text-gray-400 font-medium">Clients</p>
                <p className="text-sm font-bold text-gray-800">{sub.clients}</p>
              </div>
              <div className="text-center p-2 rounded-xl bg-gray-50 border border-gray-100">
                <p className="text-[10px] text-gray-400 font-medium">Volume</p>
                <p className="text-sm font-bold text-gray-800">${(sub.volume / 1000).toFixed(0)}K</p>
              </div>
              <div className="text-center p-2 rounded-xl bg-emerald-50 border border-emerald-100">
                <p className="text-[10px] text-emerald-600 font-medium">Commission</p>
                <p className="text-sm font-bold text-emerald-700">${sub.commission}</p>
              </div>
            </div>

            <button className="w-full py-2 rounded-xl bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200 hover:bg-blue-100 transition-colors">
              View Details
            </button>
          </motion.div>
        ))}

        {/* Add Sub-IB card */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="rounded-2xl border-2 border-dashed border-gray-200 hover:border-blue-400 hover:bg-blue-50/30 p-5 flex flex-col items-center justify-center gap-3 min-h-[200px] transition-all"
        >
          <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center">
            <UserPlus size={24} className="text-gray-400" />
          </div>
          <p className="font-bold text-gray-600">Add Sub-IB</p>
          <p className="text-xs text-gray-400">Invite a new sub-introducing broker</p>
        </motion.button>
      </div>

      {/* Commission structure */}
      <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-white border border-blue-200 flex items-center justify-center">
            <TrendingUp size={16} className="text-blue-600" />
          </div>
          <h3 className="font-bold text-gray-900">Sub-IB Commission Structure</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { level: "Level 1", desc: "Direct Sub-IB", rate: "5% override" },
            { level: "Level 2", desc: "Sub-IB of Sub-IB", rate: "3% override" },
            { level: "Level 3", desc: "Extended network", rate: "1% override" },
          ].map(({ level, desc, rate }) => (
            <div key={level} className="bg-white rounded-xl border border-blue-200 p-4">
              <p className="text-xs text-blue-600 font-bold mb-1">{level}</p>
              <p className="font-bold text-gray-900">{rate}</p>
              <p className="text-xs text-gray-500">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
