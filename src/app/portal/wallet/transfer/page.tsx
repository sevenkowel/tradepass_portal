"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeftRight, Wallet, ArrowRight, CheckCircle2,
  AlertCircle, Building2, CreditCard, ChevronDown
} from "lucide-react";
import { PageHeader } from "@/components/portal/widgets/PageHeader";
import { cn } from "@/lib/utils";

const accounts = [
  { id: "wallet", name: "Main Wallet", type: "wallet", balance: 12450, currency: "USD" },
  { id: "mt5_001", name: "MT5-001", type: "trading", balance: 8750, currency: "USD" },
  { id: "mt5_002", name: "MT5-002", type: "trading", balance: 3200, currency: "USD" },
  { id: "mt4_001", name: "MT4-001", type: "trading", balance: 1500, currency: "USD" },
];

export default function TransferPage() {
  const [fromId, setFromId] = useState("wallet");
  const [toId, setToId] = useState("mt5_001");
  const [amount, setAmount] = useState("");
  const [step, setStep] = useState<"form" | "confirm">("form");

  const fromAcc = accounts.find((a) => a.id === fromId)!;
  const toAcc = accounts.find((a) => a.id === toId)!;

  const handleSwap = () => {
    setFromId(toId);
    setToId(fromId);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Transfer Funds" description="Move funds between your wallet and trading accounts instantly." />

      <div className="max-w-2xl mx-auto">
        {step === "form" ? (
          <div className="space-y-4">
            {/* From */}
            <div className="rounded-2xl bg-white border-2 border-gray-200 p-5">
              <label className="text-sm font-bold text-gray-800 block mb-3">From</label>
              <div className="space-y-2">
                {accounts.map((acc) => (
                  <button
                    key={acc.id}
                    onClick={() => setFromId(acc.id)}
                    className={cn(
                      "w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all",
                      fromId === acc.id
                        ? "bg-blue-50 border-blue-300"
                        : "bg-white border-gray-200 hover:border-gray-300"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center border",
                      acc.type === "wallet" ? "bg-blue-50 border-blue-200" : "bg-emerald-50 border-emerald-200"
                    )}>
                      {acc.type === "wallet" ? <Wallet size={18} className="text-blue-600" /> : <Building2 size={18} className="text-emerald-600" />}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-bold text-sm text-gray-900">{acc.name}</p>
                      <p className="text-xs text-gray-500">{acc.type === "wallet" ? "Main Wallet" : "Trading Account"}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">${acc.balance.toLocaleString()}</p>
                      <p className="text-xs text-gray-400">Available</p>
                    </div>
                    {fromId === acc.id && (
                      <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
                        <CheckCircle2 size={12} className="text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Swap button */}
            <div className="flex justify-center -my-2 relative z-10">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleSwap}
                className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg"
              >
                <ArrowLeftRight size={18} />
              </motion.button>
            </div>

            {/* To */}
            <div className="rounded-2xl bg-white border-2 border-gray-200 p-5">
              <label className="text-sm font-bold text-gray-800 block mb-3">To</label>
              <div className="space-y-2">
                {accounts.filter((a) => a.id !== fromId).map((acc) => (
                  <button
                    key={acc.id}
                    onClick={() => setToId(acc.id)}
                    className={cn(
                      "w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all",
                      toId === acc.id
                        ? "bg-emerald-50 border-emerald-300"
                        : "bg-white border-gray-200 hover:border-gray-300"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center border",
                      acc.type === "wallet" ? "bg-blue-50 border-blue-200" : "bg-emerald-50 border-emerald-200"
                    )}>
                      {acc.type === "wallet" ? <Wallet size={18} className="text-blue-600" /> : <Building2 size={18} className="text-emerald-600" />}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-bold text-sm text-gray-900">{acc.name}</p>
                      <p className="text-xs text-gray-500">{acc.type === "wallet" ? "Main Wallet" : "Trading Account"}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">${acc.balance.toLocaleString()}</p>
                      <p className="text-xs text-gray-400">Current</p>
                    </div>
                    {toId === acc.id && (
                      <div className="w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center">
                        <CheckCircle2 size={12} className="text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Amount */}
            <div className="rounded-2xl bg-white border-2 border-gray-200 p-5">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-bold text-gray-800">Amount</label>
                <button
                  onClick={() => setAmount(fromAcc.balance.toString())}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700"
                >
                  Max: ${fromAcc.balance.toLocaleString()}
                </button>
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">$</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-200 text-lg font-bold text-gray-900 focus:outline-none focus:border-blue-400 transition-colors"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">Transfers are instant and free</p>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setStep("confirm")}
              disabled={!amount || Number(amount) <= 0 || Number(amount) > fromAcc.balance}
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold shadow-sm transition-colors"
            >
              Review Transfer
            </motion.button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-emerald-50 border-2 border-blue-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Confirm Transfer</h3>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 p-4 rounded-xl bg-white border-2 border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">From</p>
                  <p className="font-bold text-gray-900">{fromAcc.name}</p>
                  <p className="text-xs text-gray-400">${fromAcc.balance.toLocaleString()}</p>
                </div>
                <ArrowRight size={20} className="text-blue-600" />
                <div className="flex-1 p-4 rounded-xl bg-white border-2 border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">To</p>
                  <p className="font-bold text-gray-900">{toAcc.name}</p>
                  <p className="text-xs text-gray-400">${toAcc.balance.toLocaleString()}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-blue-200/50">
                  <span className="text-sm text-gray-600">Transfer Amount</span>
                  <span className="font-bold text-gray-900">${amount}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-blue-200/50">
                  <span className="text-sm text-gray-600">Fee</span>
                  <span className="font-bold text-emerald-600">Free</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-bold text-gray-800">Total</span>
                  <span className="font-bold text-xl text-blue-700">${amount}</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl p-3">
              <CheckCircle2 size={14} className="shrink-0 mt-0.5" />
              <p>Transfers between your accounts are instant and incur no fees.</p>
            </div>

            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setStep("form")}
                className="flex-1 py-3.5 rounded-xl bg-white border-2 border-gray-200 text-gray-700 font-bold hover:border-gray-300 transition-colors"
              >
                Back
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-sm transition-colors"
              >
                Confirm Transfer
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
