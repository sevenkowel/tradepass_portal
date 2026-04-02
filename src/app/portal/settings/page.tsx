"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Shield,
  UserCheck,
  CreditCard,
  Bell,
  Globe,
  ChevronRight,
  Check,
  Mail,
  Lock,
  Smartphone,
  Laptop2,
  BellRing,
  BellOff,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { PageHeader } from "@/components/portal/widgets/PageHeader";
import { usePortalStore } from "@/store/portalStore";
import { cn } from "@/lib/utils";

const settingsSections = [
  { id: "profile",       label: "Profile",          icon: User,       desc: "Email, country, personal info",       color: "blue"    },
  { id: "security",      label: "Security",         icon: Shield,     desc: "Password, 2FA, devices",               color: "purple"  },
  { id: "verification",  label: "Verification",     icon: UserCheck,  desc: "KYC status and documents",             color: "emerald" },
  { id: "payment",       label: "Payment Methods",  icon: CreditCard, desc: "Crypto addresses, bank accounts",      color: "amber"   },
  { id: "notifications", label: "Notifications",    icon: Bell,       desc: "Email and push preferences",           color: "rose"    },
  { id: "language",      label: "Language",         icon: Globe,      desc: "Interface language",                   color: "indigo"  },
];

const iconStyles: Record<string, { bg: string; text: string; activeBg: string; activeBorder: string; activeText: string }> = {
  blue:    { bg: "bg-blue-50",    text: "text-blue-600",    activeBg: "bg-blue-50",    activeBorder: "border-blue-200",    activeText: "text-blue-700"    },
  purple:  { bg: "bg-purple-50",  text: "text-purple-600",  activeBg: "bg-purple-50",  activeBorder: "border-purple-200",  activeText: "text-purple-700"  },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-600", activeBg: "bg-emerald-50", activeBorder: "border-emerald-200", activeText: "text-emerald-700" },
  amber:   { bg: "bg-amber-50",   text: "text-amber-600",   activeBg: "bg-amber-50",   activeBorder: "border-amber-200",   activeText: "text-amber-700"   },
  rose:    { bg: "bg-rose-50",    text: "text-rose-600",    activeBg: "bg-rose-50",    activeBorder: "border-rose-200",    activeText: "text-rose-700"    },
  indigo:  { bg: "bg-indigo-50",  text: "text-indigo-600",  activeBg: "bg-indigo-50",  activeBorder: "border-indigo-200",  activeText: "text-indigo-700"  },
};

/* ─────────────────────────── Profile Section ─────────────────────────── */
function ProfileSection() {
  const { user } = usePortalStore();
  return (
    <div className="space-y-5">
      {/* Avatar row */}
      <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-sm shrink-0">
          {user?.name?.charAt(0) ?? "U"}
        </div>
        <div>
          <p className="font-semibold text-gray-900">{user?.name}</p>
          <p className="text-sm text-gray-500 mt-0.5">{user?.email}</p>
          <button className="text-xs text-blue-600 font-medium mt-1.5 hover:text-blue-700 hover:underline transition-colors">
            Change avatar
          </button>
        </div>
      </div>

      {/* Form fields */}
      {[
        { label: "Full Name", value: user?.name ?? "", icon: User },
        { label: "Email",     value: user?.email ?? "", icon: Mail },
        { label: "Country",   value: "Singapore",       icon: Globe },
      ].map(({ label, value, icon: Icon }) => (
        <div key={label}>
          <label className="text-sm font-semibold text-gray-700 block mb-1.5">{label}</label>
          <div className="relative">
            <Icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              defaultValue={value}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border-2 border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-blue-400 transition-colors placeholder:text-gray-400"
            />
          </div>
        </div>
      ))}

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm transition-colors"
      >
        Save Changes
      </motion.button>
    </div>
  );
}

/* ─────────────────────────── Security Section ────────────────────────── */
function SecuritySection() {
  const devices = [
    { device: "MacBook Pro",      location: "Singapore", lastActive: "Active now", current: true  },
    { device: "iPhone 15",        location: "Singapore", lastActive: "2h ago",     current: false },
    { device: "Chrome / Windows", location: "Hong Kong", lastActive: "3d ago",     current: false },
  ];

  return (
    <div className="space-y-6">
      {/* Change Password */}
      <div className="p-4 rounded-2xl bg-white border-2 border-gray-200">
        <h3 className="text-sm font-bold text-gray-800 mb-4">Change Password</h3>
        {["Current Password", "New Password", "Confirm Password"].map((label) => (
          <div key={label} className="mb-3">
            <label className="text-sm font-medium text-gray-600 block mb-1.5">{label}</label>
            <div className="relative">
              <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border-2 border-gray-200 text-sm focus:outline-none focus:border-blue-400 transition-colors"
              />
            </div>
          </div>
        ))}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="mt-1 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm transition-colors"
        >
          Update Password
        </motion.button>
      </div>

      {/* 2FA */}
      <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border-2 border-emerald-200 flex items-center justify-center shrink-0">
              <Smartphone size={16} className="text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Two-Factor Authentication</p>
              <p className="text-xs text-gray-500 mt-0.5">Authenticator app enabled</p>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-white border border-emerald-200 px-3 py-1.5 rounded-xl">
            ● Enabled
          </span>
        </div>
      </div>

      {/* Active Devices */}
      <div>
        <h3 className="text-sm font-bold text-gray-800 mb-3">Active Devices</h3>
        <div className="space-y-2">
          {devices.map((d) => (
            <div
              key={d.device}
              className={cn(
                "flex items-center gap-3 p-3 rounded-xl bg-white border-2 transition-all",
                d.current ? "border-blue-200 bg-blue-50/40" : "border-gray-200 hover:border-gray-300"
              )}
            >
              <div className={cn(
                "w-9 h-9 rounded-xl flex items-center justify-center shrink-0",
                d.current ? "bg-blue-100" : "bg-gray-100"
              )}>
                <Laptop2 size={16} className={d.current ? "text-blue-600" : "text-gray-500"} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900 truncate">{d.device}</span>
                  {d.current && (
                    <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-lg font-bold shrink-0">
                      Current
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{d.location} · {d.lastActive}</p>
              </div>
              {!d.current && (
                <button className="text-xs font-semibold text-red-500 hover:text-red-700 hover:underline transition-colors shrink-0">
                  Revoke
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── KYC Section ─────────────────────────────── */
function KYCSection() {
  const { user } = usePortalStore();
  const isVerified = user?.kycStatus === "verified";

  const steps = [
    { label: "Email Verified",     done: true       },
    { label: "Phone Verified",     done: true       },
    { label: "Identity Document",  done: isVerified },
    { label: "Proof of Address",   done: isVerified },
    { label: "KYC Approved",       done: isVerified },
  ];

  return (
    <div className="space-y-5">
      {/* Status banner */}
      {isVerified ? (
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-200">
          <div className="w-10 h-10 rounded-xl bg-white border-2 border-emerald-200 flex items-center justify-center shrink-0">
            <CheckCircle2 size={18} className="text-emerald-600" />
          </div>
          <div>
            <p className="font-bold text-emerald-800">KYC Verified</p>
            <p className="text-sm text-emerald-700/80 mt-0.5">Your identity has been successfully verified.</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-amber-50 border-2 border-amber-200">
          <div className="w-10 h-10 rounded-xl bg-white border-2 border-amber-200 flex items-center justify-center shrink-0">
            <AlertCircle size={18} className="text-amber-600" />
          </div>
          <div>
            <p className="font-bold text-amber-800">Verification Pending</p>
            <p className="text-sm text-amber-700/80 mt-0.5">Please complete all verification steps.</p>
          </div>
        </div>
      )}

      {/* Steps */}
      <div className="space-y-2.5">
        {steps.map((step, i) => (
          <div
            key={step.label}
            className={cn(
              "flex items-center gap-3 p-3 rounded-xl border-2 transition-all",
              step.done
                ? "bg-emerald-50 border-emerald-200"
                : "bg-gray-50 border-gray-200"
            )}
          >
            <div className={cn(
              "w-7 h-7 rounded-full flex items-center justify-center shrink-0 font-bold text-xs",
              step.done ? "bg-emerald-600 text-white" : "bg-white border-2 border-gray-300 text-gray-400"
            )}>
              {step.done ? <Check size={13} /> : i + 1}
            </div>
            <span className={cn(
              "text-sm font-medium",
              step.done ? "text-emerald-800" : "text-gray-400"
            )}>
              {step.label}
            </span>
            {step.done && (
              <span className="ml-auto text-[10px] font-bold text-emerald-600 bg-white border border-emerald-200 px-2 py-0.5 rounded-lg">
                Done
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────── Notifications Section ──────────────────── */
function NotificationsSection() {
  const notifications = [
    { label: "Trade Execution",    desc: "When your orders are filled",             enabled: true  },
    { label: "Deposit / Withdraw", desc: "Fund movement confirmations",             enabled: true  },
    { label: "Price Alerts",       desc: "Custom price level triggers",             enabled: false },
    { label: "IB Commissions",     desc: "New commission earnings",                 enabled: true  },
    { label: "News & Updates",     desc: "Platform news and announcements",         enabled: false },
    { label: "Copy Trading",       desc: "Signal provider updates",                 enabled: true  },
  ];

  return (
    <div className="space-y-3">
      {notifications.map(({ label, desc, enabled }) => (
        <div
          key={label}
          className={cn(
            "flex items-center gap-3 p-4 rounded-2xl border-2 transition-all",
            enabled ? "bg-blue-50/40 border-blue-200" : "bg-white border-gray-200 hover:border-gray-300"
          )}
        >
          <div className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border-2",
            enabled ? "bg-blue-50 border-blue-200" : "bg-gray-50 border-gray-200"
          )}>
            {enabled
              ? <BellRing size={16} className="text-blue-600" />
              : <BellOff  size={16} className="text-gray-400" />
            }
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900">{label}</p>
            <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
          </div>
          <button
            className={cn(
              "relative w-11 h-6 rounded-full transition-colors shrink-0",
              enabled ? "bg-blue-600" : "bg-gray-200"
            )}
          >
            <span className={cn(
              "absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all",
              enabled ? "left-[22px]" : "left-0.5"
            )} />
          </button>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────── Coming Soon placeholder ────────────────── */
function ComingSoon({ id }: { id: string }) {
  const section = settingsSections.find((s) => s.id === id);
  const Icon = section?.icon ?? User;
  const color = section?.color ?? "blue";
  const style = iconStyles[color];

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-4 border-2", style.bg, style.activeBorder)}>
        <Icon size={24} className={style.text} />
      </div>
      <p className="text-gray-900 font-semibold">{section?.label}</p>
      <p className="text-gray-400 text-sm mt-1">Coming soon</p>
    </div>
  );
}

/* ─────────────────────────── Main Page ──────────────────────────────── */
export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile");

  const renderContent = () => {
    switch (activeSection) {
      case "profile":       return <ProfileSection />;
      case "security":      return <SecuritySection />;
      case "verification":  return <KYCSection />;
      case "notifications": return <NotificationsSection />;
      default:              return <ComingSoon id={activeSection} />;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your account, security and preferences."
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left nav */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl bg-white border-2 border-gray-200 overflow-hidden">
            {settingsSections.map((section, idx) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              const style = iconStyles[section.color];

              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3.5 text-left transition-all",
                    idx < settingsSections.length - 1 ? "border-b border-gray-100" : "",
                    isActive
                      ? cn("border-l-4 pl-3", `border-l-blue-500 ${style.activeBg}`)
                      : "border-l-4 border-l-transparent hover:bg-gray-50"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border",
                    isActive ? cn(style.bg, style.activeBorder) : "bg-gray-100 border-gray-200"
                  )}>
                    <Icon size={15} className={isActive ? style.text : "text-gray-500"} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn("text-sm font-semibold truncate", isActive ? style.activeText : "text-gray-700")}>
                      {section.label}
                    </p>
                    <p className="text-[11px] text-gray-400 truncate hidden sm:block">{section.desc}</p>
                  </div>
                  <ChevronRight size={13} className={cn("shrink-0 transition-transform", isActive ? cn(style.text, "opacity-80 rotate-90") : "text-gray-300")} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Content panel */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className="lg:col-span-3 rounded-2xl bg-white border-2 border-gray-200 p-6"
        >
          {/* Panel header */}
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
            {(() => {
              const section = settingsSections.find((s) => s.id === activeSection);
              const Icon = section?.icon ?? User;
              const style = iconStyles[section?.color ?? "blue"];
              return (
                <>
                  <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center border-2 shrink-0", style.bg, style.activeBorder)}>
                    <Icon size={16} className={style.text} />
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900">{section?.label}</h2>
                    <p className="text-xs text-gray-400">{section?.desc}</p>
                  </div>
                </>
              );
            })()}
          </div>

          {renderContent()}
        </motion.div>
      </div>
    </div>
  );
}
