"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDownToLine, Copy, CheckCircle2, AlertCircle,
  Wallet, QrCode, ChevronRight, Clock, ShieldCheck
} from "lucide-react";
import { PageHeader } from "@/components/portal/widgets/PageHeader";
import { cn } from "@/lib/utils";

const depositMethods = [
  { id: "usdt_trc20", name: "USDT TRC20", icon: "₮", color: "emerald", min: 50, fee: 0, time: "1-5 min" },
  { id: "usdt_erc20", name: "USDT ERC20", icon: "₮", color: "blue",    min: 100, fee: 5, time: "5-15 min" },
  { id: "btc",        name: "Bitcoin",    icon: "₿", color: "orange",  min: 0.001, fee: 0.0001, time: "10-30 min" },
  { id: "eth",        name: "Ethereum",   icon: "Ξ", color: "indigo",  min: 0.01, fee: 0.005, time: "5-10 min" },
  { id: "bank",       name: "Bank Wire",  icon: "🏦", color: "gray",    min: 1000, fee: 25, time: "1-3 days" },
];

export default function DepositPage() {
  const [selected, setSelected] = useState(depositMethods[0]);
  const [amount, setAmount] = useState("");
  const [copied, setCopied] = useState(false);
  const [step, setStep] = useState<"select" | "address">("select");

  const mockAddress = selected.id === "usdt_trc20" ? "TNXoiG6h...7Yq9z"
    : selected.id === "usdt_erc20" ? "0x742d35Cc...4f2e"
    : selected.id === "btc" ? "bc1qxy2kg...9v4t"
    : selected.id === "eth" ? "0x71C7656E...7f81"
    : "SWIFT: TRADEPASSXXX";

  const handleCopy = () => {
    navigator.clipboard.writeText(mockAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Deposit Funds" description="Add funds to your wallet via crypto or bank transfer." />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Method selection */}
        <div className="lg:col-span-2 space-y-4">
          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-4">
            <div className={cn("flex items-center gap-2 px-4 py-2 rounded-xl border-2", step === "select" ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200")}>
              <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold", step === "select" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600")}>1</div>
              <span className={cn("text-sm font-semibold", step === "select" ? "text-blue-700" : "text-gray-600")}>Select Method</span>
            </div>
            <ChevronRight size={16} className="text-gray-300" />
            <div className={cn("flex items-center gap-2 px-4 py-2 rounded-xl border-2", step === "address" ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200")}>
              <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold", step === "address" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600")}>2</div>
              <span className={cn("text-sm font-semibold", step === "address" ? "text-blue-700" : "text-gray-600")}>Deposit Address</span>
            </div>
          </div>

          {step === "select" ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {depositMethods.map((method) => (
                  <motion.button
                    key={method.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setSelected(method)}
                    className={cn(
                      "flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all",
                      selected.id === method.id
                        ? "bg-blue-50 border-blue-300 shadow-sm"
                        : "bg-white border-gray-200 hover:border-gray-300"
                    )}
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold border-2",
                      method.color === "emerald" && "bg-emerald-50 text-emerald-600 border-emerald-200",
                      method.color === "blue"    && "bg-blue-50 text-blue-600 border-blue-200",
                      method.color === "orange"  && "bg-orange-50 text-orange-600 border-orange-200",
                      method.color === "indigo"  && "bg-indigo-50 text-indigo-600 border-indigo-200",
                      method.color === "gray"    && "bg-gray-100 text-gray-600 border-gray-200",
                    )}>
                      {method.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900">{method.name}</p>
                      <p className="text-xs text-gray-500">Min: ${method.min} · Fee: {method.fee === 0 ? "Free" : `$${method.fee}`}</p>
                    </div>
                    {selected.id === method.id && (
                      <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
                        <CheckCircle2 size={12} className="text-white" />
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Amount input */}
              <div className="rounded-2xl bg-white border-2 border-gray-200 p-5">
                <label className="text-sm font-bold text-gray-800 block mb-3">Deposit Amount (USD)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">$</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder={`Minimum $${selected.min}`}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-200 text-lg font-bold text-gray-900 focus:outline-none focus:border-blue-400 transition-colors"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">Estimated arrival: {selected.time}</p>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setStep("address")}
                disabled={!amount || Number(amount) < selected.min}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold shadow-sm transition-colors"
              >
                Continue
              </motion.button>
            </>
          ) : (
            <div className="space-y-4">
              {/* Address card */}
              <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white border-2 border-blue-200 flex items-center justify-center">
                    <QrCode size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Deposit Address</p>
                    <p className="text-xs text-gray-500">Send only {selected.name} to this address</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl border-2 border-blue-200 p-4 flex items-center gap-3">
                  <code className="flex-1 text-sm font-mono text-gray-700 truncate">{mockAddress}</code>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCopy}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors",
                      copied
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100"
                    )}
                  >
                    {copied ? <CheckCircle2 size={12} /> : <Copy size={12} />}
                    {copied ? "Copied!" : "Copy"}
                  </motion.button>
                </div>

                <div className="mt-4 flex items-start gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-xl p-3">
                  <AlertCircle size={14} className="shrink-0 mt-0.5" />
                  <p>Only send {selected.name} to this address. Sending other assets may result in permanent loss.</p>
                </div>
              </div>

              {/* Amount summary */}
              <div className="rounded-2xl bg-white border-2 border-gray-200 p-5">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Amount</span>
                  <span className="font-bold text-gray-900">${amount}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Network Fee</span>
                  <span className="font-bold text-gray-900">{selected.fee === 0 ? "Free" : `$${selected.fee}`}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-bold text-gray-800">Total to Receive</span>
                  <span className="font-bold text-blue-700">${Number(amount) - selected.fee}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setStep("select")}
                  className="flex-1 py-3.5 rounded-xl bg-white border-2 border-gray-200 text-gray-700 font-bold hover:border-gray-300 transition-colors"
                >
                  Back
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-sm transition-colors"
                >
                  I&apos;ve Sent the Funds
                </motion.button>
              </div>
            </div>
          )}
        </div>

        {/* Right: Info panel */}
        <div className="space-y-4">
          <div className="rounded-2xl bg-white border-2 border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center">
                <Wallet size={16} className="text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900">Wallet Balance</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">$12,450.00</p>
            <p className="text-xs text-gray-500">Available for trading</p>
          </div>

          <div className="rounded-2xl bg-white border-2 border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                <ShieldCheck size={16} className="text-emerald-600" />
              </div>
              <h3 className="font-bold text-gray-900">Security</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-500" />
                Cold wallet storage
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-500" />
                Multi-signature required
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-500" />
                24/7 monitoring
              </li>
            </ul>
          </div>

          <div className="rounded-2xl bg-gray-50 border border-gray-200 p-4">
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
              <Clock size={12} />
              <span>Recent Deposits</span>
            </div>
            <div className="space-y-2">
              {[
                { amount: "+$5,000", method: "USDT TRC20", time: "2h ago" },
                { amount: "+$3,000", method: "Bank Wire",  time: "1d ago" },
              ].map((d, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="font-bold text-emerald-600">{d.amount}</span>
                  <span className="text-gray-400">{d.method} · {d.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
