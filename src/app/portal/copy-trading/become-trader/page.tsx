"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Crown, TrendingUp, Users, DollarSign, CheckCircle2,
  Star, ArrowRight, Shield, Zap, Globe
} from "lucide-react";
import { PageHeader } from "@/components/portal/widgets/PageHeader";
import { cn } from "@/lib/utils";

const benefits = [
  { icon: DollarSign, title: "Earn Commissions", desc: "Get paid when others copy your trades" },
  { icon: Users, title: "Build Following", desc: "Grow your investor base worldwide" },
  { icon: Shield, title: "Keep Control", desc: "Set your own terms and limits" },
  { icon: Globe, title: "Global Reach", desc: "Access to 100K+ potential copiers" },
];

const requirements = [
  "Minimum 3 months trading history",
  "Account balance $1,000+",
  "Positive overall return",
  "Verified identity (KYC)",
  "No major violations",
];

export default function BecomeTraderPage() {
  const [step, setStep] = useState<"intro" | "apply">("intro");

  if (step === "apply") {
    return (
      <div className="space-y-6">
        <PageHeader title="Apply as Signal Provider" description="Complete your application to start earning from copy trading." />

        <div className="max-w-2xl mx-auto space-y-4">
          <div className="rounded-2xl bg-white border-2 border-gray-200 p-5">
            <h3 className="font-bold text-gray-900 mb-4">Trading Account</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Select Account</label>
                <select className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border-2 border-gray-200 text-sm focus:outline-none focus:border-blue-400">
                  <option>MT5-001 ($8,750 balance)</option>
                  <option>MT5-002 ($3,200 balance)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white border-2 border-gray-200 p-5">
            <h3 className="font-bold text-gray-900 mb-4">Strategy Settings</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Strategy Name</label>
                <input placeholder="e.g., Conservative Gold Trader" className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border-2 border-gray-200 text-sm focus:outline-none focus:border-blue-400" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Description</label>
                <textarea rows={3} placeholder="Describe your trading approach..." className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border-2 border-gray-200 text-sm focus:outline-none focus:border-blue-400 resize-none" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white border-2 border-gray-200 p-5">
            <h3 className="font-bold text-gray-900 mb-4">Commission Structure</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Free", rate: "0%", desc: "Build following first" },
                { label: "Standard", rate: "10%", desc: "Of profits generated" },
                { label: "Premium", rate: "20%", desc: "For proven strategies" },
              ].map(({ label, rate, desc }) => (
                <button key={label} className="p-3 rounded-xl border-2 border-gray-200 hover:border-blue-300 text-center transition-colors">
                  <p className="font-bold text-gray-900">{label}</p>
                  <p className="text-lg font-bold text-blue-600 my-1">{rate}</p>
                  <p className="text-[10px] text-gray-500">{desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setStep("intro")}
              className="flex-1 py-3.5 rounded-xl bg-white border-2 border-gray-200 text-gray-700 font-bold hover:border-gray-300 transition-colors"
            >
              Back
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-sm transition-colors"
            >
              Submit Application
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Become a Signal Provider" description="Share your trading strategy and earn commission from followers." />

      {/* Hero */}
      <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-6 text-white">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
            <Crown size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Join Elite Traders</h2>
            <p className="text-sm text-white/80">Earn up to 30% commission from your followers</p>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-4">
          <div className="text-center">
            <p className="text-2xl font-bold">$2.4M</p>
            <p className="text-xs text-white/70">Paid to providers</p>
          </div>
          <div className="w-px h-10 bg-white/20" />
          <div className="text-center">
            <p className="text-2xl font-bold">5,000+</p>
            <p className="text-xs text-white/70">Active providers</p>
          </div>
          <div className="w-px h-10 bg-white/20" />
          <div className="text-center">
            <p className="text-2xl font-bold">100K+</p>
            <p className="text-xs text-white/70">Active copiers</p>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {benefits.map(({ icon: Icon, title, desc }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl bg-white border-2 border-gray-200 p-4 hover:border-blue-300 transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center mb-3">
              <Icon size={18} className="text-blue-600" />
            </div>
            <p className="font-bold text-gray-900 text-sm">{title}</p>
            <p className="text-xs text-gray-500 mt-1">{desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Requirements */}
        <div className="rounded-2xl bg-white border-2 border-gray-200 p-5">
          <h3 className="font-bold text-gray-900 mb-4">Requirements</h3>
          <div className="space-y-3">
            {requirements.map((req) => (
              <div key={req} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                  <CheckCircle2 size={12} className="text-emerald-600" />
                </div>
                <span className="text-sm text-gray-700">{req}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Commission tiers */}
        <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 p-5">
          <h3 className="font-bold text-emerald-800 mb-4">Commission Tiers</h3>
          <div className="space-y-3">
            {[
              { tier: "Starter", followers: "0-50", rate: "10%" },
              { tier: "Pro", followers: "51-200", rate: "20%" },
              { tier: "Elite", followers: "200+", rate: "30%" },
            ].map(({ tier, followers, rate }) => (
              <div key={tier} className="flex items-center justify-between py-2 border-b border-emerald-200/50 last:border-0">
                <div>
                  <span className="font-bold text-emerald-800">{tier}</span>
                  <span className="text-xs text-emerald-600 ml-2">({followers} followers)</span>
                </div>
                <span className="font-bold text-emerald-700">{rate}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setStep("apply")}
        className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-sm transition-colors flex items-center justify-center gap-2"
      >
        Start Application <ArrowRight size={18} />
      </motion.button>
    </div>
  );
}
