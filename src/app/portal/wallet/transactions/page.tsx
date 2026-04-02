"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDownToLine, ArrowUpFromLine, ArrowLeftRight,
  Download, Calendar, Filter, Search, ChevronDown,
  CheckCircle2, Clock, XCircle, ArrowUpDown
} from "lucide-react";
import { PageHeader } from "@/components/portal/widgets/PageHeader";
import { cn } from "@/lib/utils";

const mockTransactions = [
  { id: "TXN001", type: "deposit",    amount: 5000,  currency: "USDT", status: "completed", method: "USDT TRC20",    time: "2025-03-28 14:32", account: "Wallet" },
  { id: "TXN002", type: "withdraw",   amount: -1200, currency: "USDT", status: "completed", method: "USDT ERC20",    time: "2025-03-26 09:15", account: "Wallet" },
  { id: "TXN003", type: "transfer",   amount: -2000, currency: "USD",  status: "completed", method: "Wallet → MT5",  time: "2025-03-25 16:48", account: "MT5-001" },
  { id: "TXN004", type: "deposit",    amount: 3000,  currency: "USD",  status: "pending",   method: "Bank Wire",     time: "2025-03-25 11:20", account: "Wallet" },
  { id: "TXN005", type: "withdraw",   amount: -800,  currency: "USDT", status: "failed",    method: "USDT TRC20",    time: "2025-03-24 08:05", account: "Wallet" },
  { id: "TXN006", type: "transfer",   amount: 1500,  currency: "USD",  status: "completed", method: "MT4 → Wallet",  time: "2025-03-23 14:20", account: "Wallet" },
  { id: "TXN007", type: "deposit",    amount: 10000, currency: "USDT", status: "completed", method: "USDT TRC20",    time: "2025-03-22 10:00", account: "Wallet" },
  { id: "TXN008", type: "withdraw",   amount: -2500, currency: "USD",  status: "processing",method: "Bank Wire",     time: "2025-03-21 16:30", account: "Wallet" },
];

const typeConfig: Record<string, { icon: any; label: string; color: string }> = {
  deposit:  { icon: ArrowDownToLine,  label: "Deposit",  color: "emerald" },
  withdraw: { icon: ArrowUpFromLine,  label: "Withdraw", color: "red" },
  transfer: { icon: ArrowLeftRight,   label: "Transfer", color: "blue" },
};

const statusConfig: Record<string, { icon: any; label: string; className: string }> = {
  completed:  { icon: CheckCircle2, label: "Completed",  className: "text-emerald-700 bg-emerald-50 border-emerald-200" },
  pending:    { icon: Clock,        label: "Pending",    className: "text-amber-700 bg-amber-50 border-amber-200" },
  processing: { icon: Clock,        label: "Processing", className: "text-blue-700 bg-blue-50 border-blue-200" },
  failed:     { icon: XCircle,      label: "Failed",     className: "text-red-700 bg-red-50 border-red-200" },
};

export default function TransactionsPage() {
  const [filter, setFilter] = useState<"all" | "deposit" | "withdraw" | "transfer">("all");
  const [search, setSearch] = useState("");

  const filtered = mockTransactions.filter((t) => {
    if (filter !== "all" && t.type !== filter) return false;
    if (search && !t.id.toLowerCase().includes(search.toLowerCase()) && !t.method.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <PageHeader title="Transaction History" description="View all your deposits, withdrawals and transfers." />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Deposits",  value: "+$18,500", color: "emerald" },
          { label: "Total Withdrawals", value: "-$4,500", color: "red" },
          { label: "Net Flow",        value: "+$14,000", color: "blue" },
          { label: "Pending",         value: "$3,000",   color: "amber" },
        ].map(({ label, value, color }) => (
          <div key={label} className={cn(
            "rounded-2xl bg-white border-2 p-4",
            color === "emerald" && "border-emerald-200",
            color === "red"     && "border-red-200",
            color === "blue"    && "border-blue-200",
            color === "amber"   && "border-amber-200",
          )}>
            <p className="text-xs font-medium text-gray-500 mb-1">{label}</p>
            <p className={cn(
              "text-xl font-bold",
              color === "emerald" && "text-emerald-700",
              color === "red"     && "text-red-700",
              color === "blue"    && "text-blue-700",
              color === "amber"   && "text-amber-700",
            )}>{value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2">
          {(["all", "deposit", "withdraw", "transfer"] as const).map((f) => (
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
              placeholder="Search by ID or method..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border-2 border-gray-200 text-sm focus:outline-none focus:border-blue-400 transition-colors"
            />
          </div>
        </div>
        <button className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-white border-2 border-gray-200 px-3 py-2 rounded-xl hover:border-gray-300 transition-colors">
          <Calendar size={14} /> Last 30 Days
        </button>
        <button className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 bg-blue-50 border-2 border-blue-200 px-3 py-2 rounded-xl hover:bg-blue-100 transition-colors">
          <Download size={14} /> Export
        </button>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-white border-2 border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["Transaction", "Type", "Amount", "Method", "Status", "Date", "Account"].map((h) => (
                  <th key={h} className="text-xs font-bold text-gray-400 px-4 py-3 text-left uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((tx, i) => {
                const type = typeConfig[tx.type];
                const TypeIcon = type.icon;
                const status = statusConfig[tx.status];
                const StatusIcon = status.icon;
                return (
                  <motion.tr
                    key={tx.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors"
                  >
                    <td className="px-4 py-3.5">
                      <p className="text-sm font-bold text-gray-900">{tx.id}</p>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center border",
                          type.color === "emerald" && "bg-emerald-50 border-emerald-200",
                          type.color === "red"     && "bg-red-50 border-red-200",
                          type.color === "blue"    && "bg-blue-50 border-blue-200",
                        )}>
                          <TypeIcon size={14} className={cn(
                            type.color === "emerald" && "text-emerald-600",
                            type.color === "red"     && "text-red-600",
                            type.color === "blue"    && "text-blue-600",
                          )} />
                        </div>
                        <span className="text-sm font-semibold text-gray-700">{type.label}</span>
                      </div>
                    </td>
                    <td className={cn(
                      "px-4 py-3.5 text-sm font-bold font-mono",
                      tx.amount > 0 ? "text-emerald-600" : "text-gray-900"
                    )}>
                      {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount).toLocaleString()}
                    </td>
                    <td className="px-4 py-3.5 text-sm text-gray-600">{tx.method}</td>
                    <td className="px-4 py-3.5">
                      <span className={cn(
                        "inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold border",
                        status.className
                      )}>
                        <StatusIcon size={11} />
                        {status.label}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-gray-500">{tx.time}</td>
                    <td className="px-4 py-3.5 text-sm text-gray-600">{tx.account}</td>
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
