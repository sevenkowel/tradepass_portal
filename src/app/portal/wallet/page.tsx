"use client";

import { motion } from "framer-motion";
import {
  Wallet,
  ArrowDownToLine,
  ArrowUpFromLine,
  ArrowLeftRight,
  FileText,
  TrendingUp,
  ChevronRight,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { StatCard } from "@/components/portal/widgets/StatCard";
import { PageHeader } from "@/components/portal/widgets/PageHeader";
import { usePortalStore } from "@/store/portalStore";
import { formatCurrency, cn } from "@/lib/utils";
import Link from "next/link";

const mockTransactions = [
  { id: "TXN001", type: "Deposit", amount: 5000, currency: "USDT", status: "completed", method: "USDT TRC20", time: "2025-03-28 14:32" },
  { id: "TXN002", type: "Withdraw", amount: -1200, currency: "USDT", status: "completed", method: "USDT ERC20", time: "2025-03-26 09:15" },
  { id: "TXN003", type: "Transfer", amount: -2000, currency: "USD", status: "completed", method: "Wallet → MT5", time: "2025-03-25 16:48" },
  { id: "TXN004", type: "Deposit", amount: 3000, currency: "USD", status: "pending", method: "Wire Transfer", time: "2025-03-25 11:20" },
  { id: "TXN005", type: "Withdraw", amount: -800, currency: "USDT", status: "failed", method: "USDT TRC20", time: "2025-03-24 08:05" },
];

const quickActions = [
  { label: "Deposit", icon: ArrowDownToLine, href: "/portal/wallet/deposit", color: "var(--color-accent)" },
  { label: "Withdraw", icon: ArrowUpFromLine, href: "/portal/wallet/withdraw", color: "var(--color-secondary)" },
  { label: "Transfer", icon: ArrowLeftRight, href: "/portal/wallet/transfer", color: "var(--color-success)" },
  { label: "History", icon: FileText, href: "/portal/wallet/transactions", color: "var(--color-warning)" },
];

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { icon: React.ElementType; label: string; className: string }> = {
    completed: { icon: CheckCircle2, label: "Completed", className: "text-[var(--color-success)] bg-[var(--color-success)]/10" },
    pending: { icon: Clock, label: "Pending", className: "text-[var(--color-warning)] bg-[var(--color-warning)]/10" },
    failed: { icon: XCircle, label: "Failed", className: "text-[var(--color-error)] bg-[var(--color-error)]/10" },
    processing: { icon: AlertCircle, label: "Processing", className: "text-[var(--color-secondary)] bg-[var(--color-secondary)]/10" },
  };
  const config = map[status] ?? map["processing"];
  const Icon = config.icon;
  return (
    <span className={cn("inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full", config.className)}>
      <Icon size={11} />
      {config.label}
    </span>
  );
}

export default function WalletPage() {
  const { wallet } = usePortalStore();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Wallet"
        description="Manage your funds, deposits, and withdrawals."
        actions={
          <Link href="/portal/wallet/deposit">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-accent)] text-white text-sm font-semibold hover:bg-[var(--color-accent-hover)] transition-colors"
            >
              <ArrowDownToLine size={15} />
              Deposit
            </motion.button>
          </Link>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Balance" value={formatCurrency(wallet.total)} change={3.24} changeLabel="today" icon={Wallet} />
        <StatCard title="Equity" value={formatCurrency(wallet.equity)} change={4.81} icon={TrendingUp} iconColor="text-[var(--color-secondary)]" iconBg="bg-[var(--color-secondary)]/10" delay={0.05} />
        <StatCard title="Available" value={formatCurrency(wallet.available)} icon={ArrowDownToLine} iconColor="text-[var(--color-success)]" iconBg="bg-[var(--color-success)]/10" delay={0.1} />
        <StatCard title="Frozen" value={formatCurrency(wallet.frozen)} icon={ArrowLeftRight} iconColor="text-[var(--color-warning)]" iconBg="bg-[var(--color-warning)]/10" delay={0.15} />
      </div>

      {/* Quick actions */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
      >
        {quickActions.map(({ label, icon: Icon, href, color }) => (
          <Link key={label} href={href}>
            <motion.div
              whileHover={{ y: -2, scale: 1.01 }}
              className="flex items-center gap-3 p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--color-accent)]/20 cursor-pointer transition-colors"
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${color}18` }}>
                <Icon size={16} style={{ color }} />
              </div>
              <div>
                <span className="text-sm font-semibold text-[var(--foreground)]">{label}</span>
                <ChevronRight size={14} className="inline ml-0.5 text-[var(--foreground)]/30" />
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] overflow-hidden"
      >
        <div className="flex items-center justify-between p-5 border-b border-[var(--border)]">
          <h2 className="font-heading font-semibold text-[var(--foreground)]">Recent Transactions</h2>
          <Link href="/portal/wallet/transactions" className="text-xs text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] flex items-center gap-0.5">
            View all <ChevronRight size={12} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)]">
                {["ID", "Type", "Amount", "Method", "Status", "Time"].map((h) => (
                  <th key={h} className="text-left text-xs font-medium text-[var(--foreground)]/40 px-5 py-3">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockTransactions.map((tx, i) => (
                <motion.tr
                  key={tx.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  className="border-b border-[var(--border-light)] hover:bg-[var(--surface-elevated)] transition-colors"
                >
                  <td className="px-5 py-3.5 font-mono text-xs text-[var(--foreground)]/50">{tx.id}</td>
                  <td className="px-5 py-3.5">
                    <span className={cn(
                      "text-xs font-medium",
                      tx.type === "Deposit" ? "text-[var(--color-success)]"
                        : tx.type === "Withdraw" ? "text-[var(--color-error)]"
                        : "text-[var(--color-secondary)]"
                    )}>
                      {tx.type}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 font-semibold">
                    <span className={tx.amount > 0 ? "text-[var(--color-success)]" : "text-[var(--color-error)]"}>
                      {tx.amount > 0 ? "+" : ""}{formatCurrency(Math.abs(tx.amount))}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-[var(--foreground)]/60">{tx.method}</td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={tx.status} />
                  </td>
                  <td className="px-5 py-3.5 text-xs text-[var(--foreground)]/40">{tx.time}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
