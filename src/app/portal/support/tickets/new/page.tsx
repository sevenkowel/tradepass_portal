"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Ticket,
  MessageSquare,
  Mail,
  AlertCircle,
  Check,
  ArrowRight,
  ChevronDown,
  FileText,
  Upload,
  X,
} from "lucide-react";
import { PageHeader } from "@/components/portal/widgets/PageHeader";
import { cn } from "@/lib/utils";
import Link from "next/link";

// ─── Mock Data ─────────────────────────────────────────────
const categories = [
  { id: "account", label: "Account Issues", icon: FileText },
  { id: "deposit", label: "Deposit/Withdrawal", icon: Ticket },
  { id: "trading", label: "Trading Problems", icon: AlertCircle },
  { id: "technical", label: "Technical Support", icon: MessageSquare },
  { id: "verification", label: "KYC/Verification", icon: FileText },
  { id: "other", label: "Other", icon: MessageSquare },
];

const priorities = [
  { id: "low", label: "Low", color: "bg-gray-100 text-gray-600" },
  { id: "medium", label: "Medium", color: "bg-amber-100 text-amber-600" },
  { id: "high", label: "High", color: "bg-red-100 text-red-600" },
];

// ─── Main Page ─────────────────────────────────────────────
export default function NewTicketPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    category: "",
    priority: "medium",
    subject: "",
    description: "",
    attachments: [] as File[],
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const removeAttachment = (index: number) => {
    setFormData({
      ...formData,
      attachments: formData.attachments.filter((_, i) => i !== index),
    });
  };

  if (submitted) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Submit Ticket"
          description="Create a new support ticket"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl border-2 border-gray-200 p-8 text-center max-w-lg mx-auto"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center mx-auto mb-4">
            <Check size={32} className="text-emerald-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Ticket Submitted!</h2>
          <p className="text-gray-500 mb-6">
            Your ticket #SUP-2025-7842 has been created. Our support team will respond within 24 hours.
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/portal/support/tickets">
              <button className="bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-blue-700 transition-colors">
                View My Tickets
              </button>
            </Link>
            <Link href="/portal/dashboard">
              <button className="text-gray-600 font-medium px-6 py-2.5 rounded-xl hover:bg-gray-100 transition-colors">
                Back to Dashboard
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Submit Ticket"
        description="Create a new support ticket"
      />

      {/* Progress */}
      <div className="flex items-center gap-4">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-4">
            <div
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-colors",
                step >= s ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-400"
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

      {/* Step 1: Category */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="font-bold text-gray-800">1. Select Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setFormData({ ...formData, category: cat.id })}
                    className={cn(
                      "p-4 rounded-xl border-2 text-left transition-all",
                      formData.category === cat.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    )}
                  >
                    <Icon
                      size={24}
                      className={cn(
                        "mb-3",
                        formData.category === cat.id ? "text-blue-600" : "text-gray-400"
                      )}
                    />
                    <p className="font-medium text-gray-800">{cat.label}</p>
                  </button>
                );
              })}
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setStep(2)}
                disabled={!formData.category}
                className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                Continue <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Details */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="font-bold text-gray-800">2. Ticket Details</h2>
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 max-w-2xl space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <div className="flex gap-2">
                  {priorities.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setFormData({ ...formData, priority: p.id })}
                      className={cn(
                        "px-4 py-2 rounded-xl text-sm font-medium transition-all border-2",
                        formData.priority === p.id
                          ? "border-gray-800"
                          : "border-transparent hover:bg-gray-100",
                        p.color
                      )}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Brief description of your issue"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows={5}
                  placeholder="Please provide detailed information about your issue..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none resize-none"
                />
              </div>
            </div>
            <div className="flex justify-between max-w-2xl">
              <button
                onClick={() => setStep(1)}
                className="text-gray-600 font-medium px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!formData.subject || !formData.description}
                className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                Continue <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="font-bold text-gray-800">3. Review & Submit</h2>
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 max-w-2xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-500">Category</span>
                  <span className="font-semibold text-gray-800">
                    {categories.find((c) => c.id === formData.category)?.label}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-500">Priority</span>
                  <span
                    className={cn(
                      "text-sm font-medium px-2 py-0.5 rounded",
                      priorities.find((p) => p.id === formData.priority)?.color
                    )}
                  >
                    {priorities.find((p) => p.id === formData.priority)?.label}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-500">Subject</span>
                  <span className="font-semibold text-gray-800">{formData.subject}</span>
                </div>
                <div className="py-3">
                  <span className="text-gray-500 block mb-2">Description</span>
                  <p className="text-sm text-gray-700 bg-gray-50 rounded-xl p-3">
                    {formData.description}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-between max-w-2xl">
              <button
                onClick={() => setStep(2)}
                className="text-gray-600 font-medium px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                Submit Ticket <Check size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
