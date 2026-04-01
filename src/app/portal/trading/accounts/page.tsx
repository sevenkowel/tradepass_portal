"use client";

import { motion } from "framer-motion";
import { BarChart2, Plus, TrendingUp, TrendingDown, Eye, RefreshCw } from "lucide-react";
import { StatCard } from "@/components/portal/widgets/StatCard";
import { PageHeader } from "@/components/portal/widgets/PageHeader";
import { formatCurrency, formatPercent, cn } from "@/lib/utils";
import Link from "next/link";

const mockAccounts = [
  { id: "MT5-8843201", type: "Real", balance: 28400.5, equity: 29100.2, margin: 4200, freeMargin: 24900, marginLevel: 692.86, server: "TradePass-Live", leverage: "1:100", currency: "USD", profit: 2.46, openTrades: 3 },
  { id: "MT5-8843202", type: "Real", balance: 15200.0, equity: 15080.5, margin: 800, freeMargin: 14280.5, marginLevel: 1885.06, server: "TradePass-Live", leverage: "1:200", currency: "USD", profit: -0.79, openTrades: 1 },
  { id: "MT5-0099013", type: "Demo", balance: 100000, equity: 102450, margin: 0, freeMargin: 102450, marginLevel: 0, server: "TradePass-Demo", leverage: "1:500", currency: "USD", profit: 2.45, openTrades: 0 },
];

function AccountCard({ account }: { account: (typeof mockAccounts)[0] }) {
  const isProfit = account.profit >= 0;
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--color-accent)]/30 transition-all overflow-hidden"
    >
      {/* Header */}
      <div className={cn(
        "px-5 pt-5 pb-4",
        account.type === "Real" ? "bg-gradient-to-r from-[var(--color-accent)]/5 to-transparent" : ""
      )}>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={cn(
                "text-[10px] font-bold px-2 py-0.5 rounded-full",
                account.type === "Real"
                  ? "bg-[var(--color-accent)]/15 text-[var(--color-accent)]"
                  : "bg-[var(--color-secondary)]/15 text-[var(--color-secondary)]"
              )}>
                {account.type}
              </span>
              <span className="text-xs text-[var(--foreground)]/40">{account.leverage}</span>
              {account.openTrades > 0 && (
                <span className="text-[10px] bg-[var(--color-warning)]/15 text-[var(--color-warning)] px-1.5 py-0.5 rounded-full font-semibold">
                  {account.openTrades} open
                </span>
              )}
            </div>
            <p className="font-mono font-semibold text-[var(--foreground)]">{account.id}</p>
            <p className="text-xs text-[var(--foreground)]/40 mt-0.5">{account.server}</p>
          </div>
          <div className={cn("text-right", isProfit ? "text-[var(--color-success)]" : "text-[var(--color-error)]")}>
            <div className="text-sm font-bold">{formatPercent(account.profit)}</div>
            <div className="flex items-center gap-1 justify-end text-xs">
              {isProfit ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
              <span>Today</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="px-5 pb-4 grid grid-cols-2 gap-3">
        {[
          { label: "Balance", value: formatCurrency(account.balance) },
          { label: "Equity", value: formatCurrency(account.equity) },
          { label: "Margin", value: formatCurrency(account.margin) },
          { label: "Free Margin", value: formatCurrency(account.freeMargin) },
        ].map(({ label, value }) => (
          <div key={label}>
            <p className="text-[11px] text-[var(--foreground)]/40">{label}</p>
            <p className="text-sm font-semibold mt-0.5">{value}</p>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="px-5 pb-5 flex gap-2">
        <Link href={`/portal/wallet/deposit?account=${account.id}`} className="flex-1">
          <button className="w-full text-xs font-semibold py-2 px-3 rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)] hover:bg-[var(--color-accent)]/20 transition-colors">
            Deposit
          </button>
        </Link>
        <button className="flex-1 text-xs font-semibold py-2 px-3 rounded-xl bg-[var(--surface-elevated)] text-[var(--foreground)]/70 hover:text-[var(--foreground)] border border-[var(--border)] transition-colors">
          Withdraw
        </button>
        <button className="p-2 rounded-xl bg-[var(--surface-elevated)] text-[var(--foreground)]/50 hover:text-[var(--foreground)] border border-[var(--border)] transition-colors">
          <Eye size={13} />
        </button>
      </div>
    </motion.div>
  );
}

export default function TradingAccountsPage() {
  const realAccounts = mockAccounts.filter((a) => a.type === "Real");
  const demoAccounts = mockAccounts.filter((a) => a.type === "Demo");

  const totalBalance = realAccounts.reduce((s, a) => s + a.balance, 0);
  const totalEquity = realAccounts.reduce((s, a) => s + a.equity, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Trading Accounts"
        description="Manage your MT5 real and demo trading accounts."
        actions={
          <Link href="/portal/trading/open-account">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-accent)] text-white text-sm font-semibold"
            >
              <Plus size={15} />
              Open Account
            </motion.button>
          </Link>
        }
      />

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Balance" value={formatCurrency(totalBalance)} change={1.82} icon={BarChart2} />
        <StatCard title="Total Equity" value={formatCurrency(totalEquity)} change={2.31} icon={TrendingUp} iconColor="text-[var(--color-secondary)]" iconBg="bg-[var(--color-secondary)]/10" delay={0.05} />
        <StatCard title="Real Accounts" value={String(realAccounts.length)} icon={BarChart2} iconColor="text-[var(--color-accent)]" iconBg="bg-[var(--color-accent)]/10" delay={0.1} />
        <StatCard title="Demo Accounts" value={String(demoAccounts.length)} icon={RefreshCw} iconColor="text-[var(--color-warning)]" iconBg="bg-[var(--color-warning)]/10" delay={0.15} />
      </div>

      {/* Real accounts */}
      <div>
        <h2 className="text-sm font-semibold text-[var(--foreground)]/50 uppercase tracking-wider mb-3">
          Real Accounts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {realAccounts.map((acc) => <AccountCard key={acc.id} account={acc} />)}
          {/* Add account card */}
          <Link href="/portal/trading/open-account">
            <motion.div
              whileHover={{ y: -3 }}
              className="h-full min-h-[200px] rounded-2xl border-2 border-dashed border-[var(--border)] hover:border-[var(--color-accent)]/50 flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-[var(--surface-elevated)] group-hover:bg-[var(--color-accent)]/10 flex items-center justify-center transition-colors">
                <Plus size={18} className="text-[var(--foreground)]/30 group-hover:text-[var(--color-accent)] transition-colors" />
              </div>
              <p className="text-sm text-[var(--foreground)]/40 group-hover:text-[var(--foreground)] transition-colors">
                Open Real Account
              </p>
            </motion.div>
          </Link>
        </div>
      </div>

      {/* Demo accounts */}
      <div>
        <h2 className="text-sm font-semibold text-[var(--foreground)]/50 uppercase tracking-wider mb-3">
          Demo Accounts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {demoAccounts.map((acc) => <AccountCard key={acc.id} account={acc} />)}
        </div>
      </div>
    </div>
  );
}
