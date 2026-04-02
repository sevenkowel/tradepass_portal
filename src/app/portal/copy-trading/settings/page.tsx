"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Settings,
  Wallet,
  AlertTriangle,
  Shield,
  TrendingDown,
  DollarSign,
  Percent,
  Check,
  Info,
} from "lucide-react";
import { PageHeader } from "@/components/portal/widgets/PageHeader";
import { cn } from "@/lib/utils";

// ─── Mock Data ─────────────────────────────────────────────
const copySettings = {
  allocationMode: "fixed", // fixed | proportional
  fixedAmount: 1000,
  proportionalPercent: 10,
  stopLoss: true,
  stopLossValue: 500,
  maxDrawdown: 20,
  pauseOnLoss: true,
  pauseThreshold: 3,
};

// ─── Main Page ─────────────────────────────────────────────
export default function CopySettingsPage() {
  const [settings, setSettings] = useState(copySettings);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Copy Trading Settings"
        description="Configure your risk management and allocation preferences"
      />

      {/* Allocation Settings */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border-2 border-gray-200 p-5"
      >
        <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center">
            <Wallet size={14} className="text-blue-600" />
          </div>
          Allocation Settings
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Allocation Mode
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => setSettings({ ...settings, allocationMode: "fixed" })}
                className={cn(
                  "flex-1 p-4 rounded-xl border-2 text-left transition-all",
                  settings.allocationMode === "fixed"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                )}
              >
                <p className="font-semibold text-gray-800">Fixed Amount</p>
                <p className="text-sm text-gray-500">Allocate a fixed amount per trade</p>
              </button>
              <button
                onClick={() => setSettings({ ...settings, allocationMode: "proportional" })}
                className={cn(
                  "flex-1 p-4 rounded-xl border-2 text-left transition-all",
                  settings.allocationMode === "proportional"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                )}
              >
                <p className="font-semibold text-gray-800">Proportional</p>
                <p className="text-sm text-gray-500">Copy percentage of trader position</p>
              </button>
            </div>
          </div>

          {settings.allocationMode === "fixed" ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fixed Amount per Trade
              </label>
              <div className="relative">
                <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  value={settings.fixedAmount}
                  onChange={(e) => setSettings({ ...settings, fixedAmount: Number(e.target.value) })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Proportional Percentage
              </label>
              <div className="relative">
                <Percent size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  value={settings.proportionalPercent}
                  onChange={(e) => setSettings({ ...settings, proportionalPercent: Number(e.target.value) })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none"
                />
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Risk Management */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl border-2 border-gray-200 p-5"
      >
        <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center">
            <Shield size={14} className="text-red-600" />
          </div>
          Risk Management
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3">
              <AlertTriangle size={18} className="text-amber-500" />
              <div>
                <p className="font-medium text-gray-800">Stop Loss</p>
                <p className="text-sm text-gray-500">Automatically close when loss reaches</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.stopLoss}
                onChange={(e) => setSettings({ ...settings, stopLoss: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {settings.stopLoss && (
            <div className="pl-12">
              <div className="relative">
                <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  value={settings.stopLossValue}
                  onChange={(e) => setSettings({ ...settings, stopLossValue: Number(e.target.value) })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maximum Drawdown (%)
            </label>
            <div className="relative">
              <TrendingDown size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                value={settings.maxDrawdown}
                onChange={(e) => setSettings({ ...settings, maxDrawdown: Number(e.target.value) })}
                className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none"
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">Copying will pause if drawdown exceeds this value</p>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3">
              <Info size={18} className="text-blue-500" />
              <div>
                <p className="font-medium text-gray-800">Pause on Consecutive Losses</p>
                <p className="text-sm text-gray-500">Auto-pause after N losing trades</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.pauseOnLoss}
                onChange={(e) => setSettings({ ...settings, pauseOnLoss: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {settings.pauseOnLoss && (
            <div className="pl-12">
              <input
                type="number"
                value={settings.pauseThreshold}
                onChange={(e) => setSettings({ ...settings, pauseThreshold: Number(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none"
                placeholder="Number of consecutive losses"
              />
            </div>
          )}
        </div>
      </motion.div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className={cn(
            "font-semibold px-8 py-3 rounded-xl transition-colors flex items-center gap-2",
            saved
              ? "bg-emerald-600 text-white"
              : "bg-blue-600 text-white hover:bg-blue-700"
          )}
        >
          {saved ? <Check size={18} /> : null}
          {saved ? "Saved!" : "Save Settings"}
        </button>
      </div>
    </div>
  );
}
