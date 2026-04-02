"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Gamepad2,
  ChevronRight,
  Check,
  Wallet,
  TrendingUp,
  Shield,
  Clock,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { PageHeader } from "@/components/portal/widgets/PageHeader";
import { cn } from "@/lib/utils";
import Link from "next/link";

// ─── Mock Data ─────────────────────────────────────────────
const accountTypes = [
  {
    id: "real",
    title: "Real Account",
    subtitle: "Live Trading",
    description: "Trade with real money on live markets. Access all trading instruments and features.",
    icon: Briefcase,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    borderColor: "border-blue-200",
    features: [
      "Real market execution",
      "Full instrument access",
      "Deposit & withdraw funds",
      "Copy trading enabled",
      "24/7 support",
    ],
    requirements: ["Minimum deposit $100", "KYC verification required"],
    recommended: true,
  },
  {
    id: "demo",
    title: "Demo Account",
    subtitle: "Practice Trading",
    description: "Practice trading risk-free with virtual funds. Perfect for learning and testing strategies.",
    icon: Gamepad2,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    borderColor: "border-purple-200",
    features: [
      "$100,000 virtual balance",
      "Real market conditions",
      "All instruments available",
      "Risk-free practice",
      "No time limit",
    ],
    requirements: ["No deposit required", "Instant activation"],
    recommended: false,
  },
];

const leverageOptions = ["1:50", "1:100", "1:200", "1:500"];
const currencyOptions = ["USD", "EUR", "GBP"];

// ─── Components ────────────────────────────────────────────
function AccountTypeCard({
  type,
  selected,
  onSelect,
}: {
  type: (typeof accountTypes)[0];
  selected: boolean;
  onSelect: () => void;
}) {
  const Icon = type.icon;
  return (
    <motion.div
      whileHover={{ y: -2 }}
      onClick={onSelect}
      className={cn(
        "relative rounded-2xl border-2 p-5 cursor-pointer transition-all duration-200",
        selected
          ? "border-blue-500 bg-blue-50/30"
          : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-md"
      )}
    >
      {type.recommended && (
        <div className="absolute -top-3 left-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full">
          RECOMMENDED
        </div>
      )}
      {selected && (
        <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
          <Check size={14} className="text-white" />
        </div>
      )}
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0",
            type.iconBg,
            type.borderColor,
            "border-2"
          )}
        >
          <Icon size={26} className={type.iconColor} />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-800">{type.title}</h3>
          <p className="text-sm text-blue-600 font-medium">{type.subtitle}</p>
          <p className="text-sm text-gray-500 mt-2">{type.description}</p>
        </div>
      </div>

      <div className="mt-5 space-y-2">
        {type.features.map((feature, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center">
              <Check size={12} className="text-emerald-600" />
            </div>
            <span className="text-sm text-gray-600">{feature}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-400 mb-2">Requirements:</p>
        <div className="flex flex-wrap gap-2">
          {type.requirements.map((req, idx) => (
            <span
              key={idx}
              className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded-lg border border-gray-200"
            >
              {req}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Page ─────────────────────────────────────────────
export default function OpenAccountPage() {
  const [selectedType, setSelectedType] = useState<string>("real");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    accountName: "",
    leverage: "1:100",
    currency: "USD",
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Open Trading Account"
        description="Choose your account type and configure your trading preferences"
      />

      {/* Progress Steps */}
      <div className="flex items-center gap-4">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-4">
            <div
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-colors",
                step >= s
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-400"
              )}
            >
              {s}
            </div>
            {s < 3 && (
              <div
                className={cn(
                  "w-16 h-1 rounded-full transition-colors",
                  step > s ? "bg-blue-500" : "bg-gray-200"
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Select Account Type */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="font-bold text-gray-800">1. Select Account Type</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {accountTypes.map((type) => (
                <AccountTypeCard
                  key={type.id}
                  type={type}
                  selected={selectedType === type.id}
                  onSelect={() => setSelectedType(type.id)}
                />
              ))}
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                Continue <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Configure Account */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="font-bold text-gray-800">2. Configure Account</h2>
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 max-w-2xl">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Name
                  </label>
                  <input
                    type="text"
                    placeholder="My Trading Account"
                    value={formData.accountName}
                    onChange={(e) =>
                      setFormData({ ...formData, accountName: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Leverage
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {leverageOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() =>
                          setFormData({ ...formData, leverage: opt })
                        }
                        className={cn(
                          "px-4 py-2 rounded-xl text-sm font-medium transition-all border-2",
                          formData.leverage === opt
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                        )}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Currency
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {currencyOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() =>
                          setFormData({ ...formData, currency: opt })
                        }
                        className={cn(
                          "px-4 py-2 rounded-xl text-sm font-medium transition-all border-2",
                          formData.currency === opt
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                        )}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="text-gray-600 font-medium px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                Continue <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Review & Create */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="font-bold text-gray-800">3. Review & Create</h2>
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 max-w-2xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-500">Account Type</span>
                  <span className="font-semibold text-gray-800">
                    {selectedType === "real" ? "Real Account" : "Demo Account"}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-500">Account Name</span>
                  <span className="font-semibold text-gray-800">
                    {formData.accountName || "My Trading Account"}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-500">Leverage</span>
                  <span className="font-semibold text-gray-800">
                    {formData.leverage}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-gray-500">Currency</span>
                  <span className="font-semibold text-gray-800">
                    {formData.currency}
                  </span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-start gap-3">
                  <Sparkles size={20} className="text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-blue-800">
                      What happens next?
                    </p>
                    <p className="text-sm text-blue-600 mt-1">
                      Your account will be created instantly. You can start trading
                      immediately or deposit funds to begin.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="text-gray-600 font-medium px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors"
              >
                Back
              </button>
              <Link href="/portal/trading/accounts">
                <button className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2">
                  Create Account <Check size={18} />
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
