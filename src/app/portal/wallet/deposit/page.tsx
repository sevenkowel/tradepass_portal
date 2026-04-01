"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDownToLine,
  Copy,
  Check,
  ChevronRight,
  CreditCard,
  Building2,
  Bitcoin,
  Info,
  Shield,
} from "lucide-react";
import { PageHeader } from "@/components/portal/widgets/PageHeader";
import { cn } from "@/lib/utils";

type DepositMethod = "crypto" | "wire" | "card";
type CryptoNetwork = "USDT_TRC20" | "USDT_ERC20" | "BTC" | "ETH";

const cryptoOptions: { id: CryptoNetwork; label: string; network: string; fee: string; min: string; time: string }[] = [
  { id: "USDT_TRC20", label: "USDT", network: "TRC20", fee: "0%", min: "$10", time: "~3 min" },
  { id: "USDT_ERC20", label: "USDT", network: "ERC20", fee: "0%", min: "$10", time: "~5 min" },
  { id: "BTC", label: "Bitcoin", network: "BTC", fee: "0%", min: "$50", time: "~30 min" },
  { id: "ETH", label: "Ethereum", network: "ETH", fee: "0%", min: "$20", time: "~5 min" },
];

const mockAddresses: Record<CryptoNetwork, string> = {
  USDT_TRC20: "TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE",
  USDT_ERC20: "0x4e83362442B8d1beC281594CeA3050c8EB01311d",
  BTC: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  ETH: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
};

function CryptoDeposit() {
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoNetwork>("USDT_TRC20");
  const [copied, setCopied] = useState(false);
  const address = mockAddresses[selectedCrypto];

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-5">
      {/* Network selector */}
      <div>
        <p className="text-sm font-medium text-[var(--foreground)]/70 mb-3">Select Network</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {cryptoOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSelectedCrypto(opt.id)}
              className={cn(
                "p-3 rounded-xl border text-left transition-all",
                selectedCrypto === opt.id
                  ? "border-[var(--color-accent)] bg-[var(--color-accent)]/8"
                  : "border-[var(--border)] hover:border-[var(--color-accent)]/40"
              )}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold">{opt.label}</span>
                {selectedCrypto === opt.id && (
                  <span className="w-4 h-4 rounded-full bg-[var(--color-accent)] flex items-center justify-center">
                    <Check size={10} className="text-white" />
                  </span>
                )}
              </div>
              <span className="text-[11px] text-[var(--foreground)]/50 bg-[var(--surface-elevated)] px-1.5 py-0.5 rounded">
                {opt.network}
              </span>
              <div className="mt-2 text-[11px] text-[var(--foreground)]/40 space-y-0.5">
                <div>Fee: <span className="text-[var(--color-success)]">{opt.fee}</span></div>
                <div>Min: {opt.min}</div>
                <div>~{opt.time}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Address display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCrypto}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] p-5"
        >
          <p className="text-sm font-medium text-[var(--foreground)]/60 mb-4">
            Send {cryptoOptions.find((o) => o.id === selectedCrypto)?.label} ({cryptoOptions.find((o) => o.id === selectedCrypto)?.network}) to this address:
          </p>

          {/* QR placeholder */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-24 h-24 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
              <div className="w-20 h-20 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-lg opacity-20" />
              <span className="absolute text-xs text-[var(--foreground)]/40">QR Code</span>
            </div>
            <div className="flex-1 w-full">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                <code className="flex-1 text-sm font-mono text-[var(--foreground)] break-all">
                  {address}
                </code>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={handleCopy}
                  className={cn(
                    "shrink-0 p-2 rounded-lg transition-all",
                    copied
                      ? "bg-[var(--color-success)]/15 text-[var(--color-success)]"
                      : "bg-[var(--surface-elevated)] text-[var(--foreground)]/60 hover:text-[var(--foreground)]"
                  )}
                >
                  {copied ? <Check size={15} /> : <Copy size={15} />}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Warning */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-[var(--color-warning)]/8 border border-[var(--color-warning)]/20">
        <Info size={16} className="text-[var(--color-warning)] shrink-0 mt-0.5" />
        <div className="text-sm text-[var(--foreground)]/70">
          <strong>Important:</strong> Only send {cryptoOptions.find((o) => o.id === selectedCrypto)?.label} via {cryptoOptions.find((o) => o.id === selectedCrypto)?.network} network to this address. Sending other assets may result in permanent loss.
        </div>
      </div>
    </div>
  );
}

export default function DepositPage() {
  const [method, setMethod] = useState<DepositMethod>("crypto");

  const methods = [
    { id: "crypto" as DepositMethod, label: "Cryptocurrency", icon: Bitcoin, desc: "Fast, 0% fee" },
    { id: "wire" as DepositMethod, label: "Wire Transfer", icon: Building2, desc: "1-3 business days" },
    { id: "card" as DepositMethod, label: "Card Payment", icon: CreditCard, desc: "Visa / Mastercard" },
  ];

  return (
    <div className="max-w-3xl space-y-6">
      <PageHeader
        title="Deposit Funds"
        description="Choose your preferred deposit method."
      />

      {/* Security badge */}
      <div className="flex items-center gap-2 text-xs text-[var(--foreground)]/50">
        <Shield size={13} className="text-[var(--color-accent)]" />
        All transactions are encrypted and secured with 256-bit SSL
      </div>

      {/* Method selector */}
      <div className="grid grid-cols-3 gap-3">
        {methods.map(({ id, label, icon: Icon, desc }) => (
          <button
            key={id}
            onClick={() => setMethod(id)}
            className={cn(
              "flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all text-center",
              method === id
                ? "border-[var(--color-accent)] bg-[var(--color-accent)]/8 text-[var(--foreground)]"
                : "border-[var(--border)] hover:border-[var(--color-accent)]/40 text-[var(--foreground)]/60"
            )}
          >
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center",
              method === id ? "bg-[var(--color-accent)]/15" : "bg-[var(--surface-elevated)]"
            )}>
              <Icon size={18} className={method === id ? "text-[var(--color-accent)]" : ""} />
            </div>
            <div>
              <p className="text-sm font-semibold">{label}</p>
              <p className="text-[11px] text-[var(--foreground)]/40">{desc}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-6">
        <AnimatePresence mode="wait">
          {method === "crypto" && (
            <motion.div key="crypto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <CryptoDeposit />
            </motion.div>
          )}
          {method === "wire" && (
            <motion.div key="wire" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="space-y-4">
                <p className="text-sm font-medium text-[var(--foreground)]/70">Bank Wire Transfer Details</p>
                {[
                  ["Bank Name", "DBS Bank Singapore"],
                  ["Account Name", "TradePass Financial Ltd."],
                  ["Account Number", "033-901234-0"],
                  ["SWIFT Code", "DBSSSGSG"],
                  ["Currency", "USD"],
                  ["Reference", "Your Account ID"],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between py-2.5 border-b border-[var(--border-light)]">
                    <span className="text-sm text-[var(--foreground)]/50">{label}</span>
                    <span className="text-sm font-medium">{value}</span>
                  </div>
                ))}
                <div className="flex items-start gap-3 p-4 rounded-xl bg-[var(--color-warning)]/8 border border-[var(--color-warning)]/20 mt-4">
                  <Info size={16} className="text-[var(--color-warning)] shrink-0 mt-0.5" />
                  <p className="text-sm text-[var(--foreground)]/70">Please include your account ID as the payment reference. Processing takes 1-3 business days.</p>
                </div>
              </div>
            </motion.div>
          )}
          {method === "card" && (
            <motion.div key="card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="text-center py-8">
                <CreditCard size={40} className="mx-auto text-[var(--foreground)]/20 mb-3" />
                <p className="text-[var(--foreground)]/50">Card payment integration coming soon.</p>
                <p className="text-sm text-[var(--foreground)]/30 mt-1">Visa & Mastercard supported</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
