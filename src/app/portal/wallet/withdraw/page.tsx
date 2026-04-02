"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpFromLine, AlertCircle, CheckCircle2, Wallet,
  Clock, ShieldCheck, ChevronRight, Building2
} from "lucide-react";
import { PageHeader } from "@/components/portal/widgets/PageHeader";
import { cn } from "@/lib/utils";

const withdrawMethods = [
  { id: "usdt_trc20", name: "USDT TRC20", color: "emerald", min: 50, max: 50000, fee: 1, time: "1-5 min" },
  { id: "usdt_erc20", name: "USDT ERC20", color: "blue",    min: 100, max: 100000, fee: 5, time: "5-15 min" },
  { id: "bank",       name: "Bank Wire",  color: "gray",    min: 1000, max: 500000, fee: 25, time: "1-3 days" },
];

export default function WithdrawPage() {
  const [selected, setSelected] = useState(withdrawMethods[0]);
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [step, setStep] = useState<"form" | "confirm">("form");

  const balance = 12450;
  const receiveAmount = Number(amount) - selected.fee;

  return (
    <div className="space-y-6">
      <PageHeader title="Withdraw Funds" description="Withdraw funds to your external wallet or bank account." />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Form */}
        <div className="lg:col-span-2 space-y-4">
          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-4">
            <div className={cn("flex items-center gap-2 px-4 py-2 rounded-xl border-2", step === "form" ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200")}>
              <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold", step === "form" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600")}>1</div>
              <span className={cn("text-sm font-semibold", step === "form" ? "text-blue-700" : "text-gray-600")}>Withdraw Details</span>
            </div>
            <ChevronRight size={16} className="text-gray-300" />
            <div className={cn("flex items-center gap-2 px-4 py-2 rounded-xl border-2", step === "confirm" ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200")}>
              <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold", step === "confirm" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600")}>2</div>
              <span className={cn("text-sm font-semibold", step === "confirm" ? "text-blue-700" : "text-gray-600")}>Confirm</span>
            </div>
          </div>

          {step === "form" ? (
            <>
              {/* Method selection */}
              <div className="rounded-2xl bg-white border-2 border-gray-200 p-5">
                <label className="text-sm font-bold text-gray-800 block mb-3">Withdrawal Method</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {withdrawMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setSelected(method)}
                      className={cn(
                        "p-3 rounded-xl border-2 text-left transition-all",
                        selected.id === method.id
                          ? "bg-blue-50 border-blue-300"
                          : "bg-white border-gray-200 hover:border-gray-300"
                      )}
                    >
                      <p className="font-bold text-sm text-gray-900">{method.name}</p>
                      <p className="text-[10px] text-gray-500 mt-1">Fee: ${method.fee}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount */}
              <div className="rounded-2xl bg-white border-2 border-gray-200 p-5">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-bold text-gray-800">Amount</label>
                  <button
                    onClick={() => setAmount(balance.toString())}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700"
                  >
                    Max: ${balance.toLocaleString()}
                  </button>
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">$</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder={`Min $${selected.min} - Max $${selected.max.toLocaleString()}`}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-200 text-lg font-bold text-gray-900 focus:outline-none focus:border-blue-400 transition-colors"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">Processing time: {selected.time}</p>
              </div>

              {/* Address */}
              <div className="rounded-2xl bg-white border-2 border-gray-200 p-5">
                <label className="text-sm font-bold text-gray-800 block mb-3">
                  {selected.id === "bank" ? "Bank Account Details" : "Wallet Address"}
                </label>
                {selected.id === "bank" ? (
                  <div className="space-y-3">
                    <input placeholder="Account Holder Name" className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border-2 border-gray-200 text-sm focus:outline-none focus:border-blue-400" />
                    <input placeholder="Bank Name" className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border-2 border-gray-200 text-sm focus:outline-none focus:border-blue-400" />
                    <input placeholder="Account Number / IBAN" className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border-2 border-gray-200 text-sm focus:outline-none focus:border-blue-400" />
                    <input placeholder="SWIFT/BIC Code" className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border-2 border-gray-200 text-sm focus:outline-none focus:border-blue-400" />
                  </div>
                ) : (
                  <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={`Enter ${selected.name} address`}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-200 text-sm font-mono focus:outline-none focus:border-blue-400 transition-colors"
                  />
                )}
              </div>

              {/* Summary */}
              <div className="rounded-2xl bg-gray-50 border-2 border-gray-200 p-5">
                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                  <span className="text-sm text-gray-600">Withdraw Amount</span>
                  <span className="font-bold text-gray-900">${amount || "0"}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                  <span className="text-sm text-gray-600">Network Fee</span>
                  <span className="font-bold text-gray-900">${selected.fee}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-bold text-gray-800">You Receive</span>
                  <span className="font-bold text-lg text-blue-700">${receiveAmount > 0 ? receiveAmount : "0"}</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setStep("confirm")}
                disabled={!amount || Number(amount) < selected.min || Number(amount) > selected.max || (!address && selected.id !== "bank")}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold shadow-sm transition-colors"
              >
                Continue
              </motion.button>
            </>
          ) : (
            <div className="space-y-4">
              <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 p-6">
                <h3 className="font-bold text-gray-900 mb-4">Confirm Withdrawal</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-blue-200/50">
                    <span className="text-sm text-gray-600">Method</span>
                    <span className="font-bold text-gray-900">{selected.name}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-blue-200/50">
                    <span className="text-sm text-gray-600">Amount</span>
                    <span className="font-bold text-gray-900">${amount}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-blue-200/50">
                    <span className="text-sm text-gray-600">Fee</span>
                    <span className="font-bold text-gray-900">${selected.fee}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm font-bold text-gray-800">Total Receive</span>
                    <span className="font-bold text-xl text-blue-700">${receiveAmount}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-xl p-3">
                <AlertCircle size={14} className="shrink-0 mt-0.5" />
                <p>Please verify the address carefully. Withdrawals to incorrect addresses cannot be recovered.</p>
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
                  Confirm Withdrawal
                </motion.button>
              </div>
            </div>
          )}
        </div>

        {/* Right: Info */}
        <div className="space-y-4">
          <div className="rounded-2xl bg-white border-2 border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center">
                <Wallet size={16} className="text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900">Available Balance</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">${balance.toLocaleString()}</p>
            <p className="text-xs text-gray-500">Withdrawable after margin requirements</p>
          </div>

          <div className="rounded-2xl bg-white border-2 border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                <ShieldCheck size={16} className="text-emerald-600" />
              </div>
              <h3 className="font-bold text-gray-900">Security Check</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-500" />
                2FA verification required
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-500" />
                Email confirmation
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-500" />
                24h withdrawal limit: $100K
              </li>
            </ul>
          </div>

          <div className="rounded-2xl bg-gray-50 border border-gray-200 p-4">
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
              <Clock size={12} />
              <span>Recent Withdrawals</span>
            </div>
            <div className="space-y-2">
              {[
                { amount: "-$1,200", method: "USDT ERC20", time: "2d ago" },
                { amount: "-$800", method: "USDT TRC20", time: "5d ago" },
              ].map((w, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="font-bold text-red-500">{w.amount}</span>
                  <span className="text-gray-400">{w.method} · {w.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
