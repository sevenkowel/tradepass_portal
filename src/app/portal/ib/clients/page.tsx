"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users, TrendingUp, DollarSign, Search, Filter,
  ChevronDown, ArrowUpDown, Mail, MoreHorizontal,
  CheckCircle2, Clock, XCircle
} from "lucide-react";
import { PageHeader } from "@/components/portal/widgets/PageHeader";
import { cn } from "@/lib/utils";

const mockClients = [
  { id: "C001", name: "John Smith", email: "john@example.com", country: "US", joined: "2025-03-15", status: "active", volume: 1250000, commission: 1250, trades: 45 },
  { id: "C002", name: "Sarah Chen", email: "sarah@example.com", country: "SG", joined: "2025-03-10", status: "active", volume: 890000, commission: 890, trades: 32 },
  { id: "C003", name: "Michael Brown", email: "mike@example.com", country: "UK", joined: "2025-03-05", status: "pending", volume: 0, commission: 0, trades: 0 },
  { id: "C004", name: "Emma Wilson", email: "emma@example.com", country: "AU", joined: "2025-02-28", status: "active", volume: 2100000, commission: 2100, trades: 78 },
  { id: "C005", name: "David Lee", email: "david@example.com", country: "KR", joined: "2025-02-20", status: "inactive", volume: 450000, commission: 450, trades: 18 },
  { id: "C006", name: "Lisa Wang", email: "lisa@example.com", country: "CN", joined: "2025-02-15", status: "active", volume: 1560000, commission: 1560, trades: 56 },
];

const statusConfig: Record<string, { icon: any; label: string; className: string }> = {
  active:   { icon: CheckCircle2, label: "Active",   className: "text-emerald-700 bg-emerald-50 border-emerald-200" },
  pending:  { icon: Clock,        label: "Pending",  className: "text-amber-700 bg-amber-50 border-amber-200" },
  inactive: { icon: XCircle,      label: "Inactive", className: "text-gray-700 bg-gray-100 border-gray-200" },
};

export default function ClientsPage() {
  const [filter, setFilter] = useState<"all" | "active" | "pending" | "inactive">("all");
  const [search, setSearch] = useState("");

  const filtered = mockClients.filter((c) => {
    if (filter !== "all" && c.status !== filter) return false;
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.email.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const totalClients = mockClients.length;
  const activeClients = mockClients.filter((c) => c.status === "active").length;
  const totalVolume = mockClients.reduce((sum, c) => sum + c.volume, 0);
  const totalCommission = mockClients.reduce((sum, c) => sum + c.commission, 0);

  return (
    <div className="space-y-6">
      <PageHeader title="My Clients" description="Manage your referred clients and track their activity." />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Clients", value: totalClients, color: "blue" },
          { label: "Active", value: activeClients, color: "emerald" },
          { label: "Total Volume", value: `$${(totalVolume / 1000000).toFixed(1)}M`, color: "indigo" },
          { label: "Commission Earned", value: `$${totalCommission.toLocaleString()}`, color: "amber" },
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

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2">
          {(["all", "active", "pending", "inactive"] as const).map((f) => (
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search clients..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border-2 border-gray-200 text-sm focus:outline-none focus:border-blue-400 transition-colors"
            />
          </div>
        </div>
        <button className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 bg-blue-50 border-2 border-blue-200 px-3 py-2 rounded-xl hover:bg-blue-100 transition-colors">
          <Mail size={14} /> Email All
        </button>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-white border-2 border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["Client", "Status", "Joined", "Volume", "Commission", "Trades", ""].map((h) => (
                  <th key={h} className="text-xs font-bold text-gray-400 px-4 py-3 text-left uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((client, i) => {
                const status = statusConfig[client.status];
                const StatusIcon = status.icon;
                return (
                  <motion.tr
                    key={client.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors"
                  >
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-sm font-bold text-blue-700">
                          {client.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">{client.name}</p>
                          <p className="text-xs text-gray-400">{client.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={cn(
                        "inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold border",
                        status.className
                      )}>
                        <StatusIcon size={11} />
                        {status.label}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-sm text-gray-600">{client.joined}</td>
                    <td className="px-4 py-3.5 text-sm font-mono font-semibold text-gray-900">${client.volume.toLocaleString()}</td>
                    <td className="px-4 py-3.5 text-sm font-mono font-bold text-emerald-600">+${client.commission}</td>
                    <td className="px-4 py-3.5 text-sm text-gray-600">{client.trades}</td>
                    <td className="px-4 py-3.5">
                      <button className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors">
                        <MoreHorizontal size={16} />
                      </button>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
