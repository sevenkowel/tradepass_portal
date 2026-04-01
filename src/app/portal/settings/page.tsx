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
  Plus,
  Trash2,
} from "lucide-react";
import { PageHeader } from "@/components/portal/widgets/PageHeader";
import { usePortalStore } from "@/store/portalStore";
import { cn } from "@/lib/utils";

const settingsSections = [
  { id: "profile", label: "Profile", icon: User, desc: "Email, country, personal info" },
  { id: "security", label: "Security", icon: Shield, desc: "Password, 2FA, devices" },
  { id: "verification", label: "Verification", icon: UserCheck, desc: "KYC status and documents" },
  { id: "payment", label: "Payment Methods", icon: CreditCard, desc: "Crypto addresses, bank accounts" },
  { id: "notifications", label: "Notifications", icon: Bell, desc: "Email and push preferences" },
  { id: "language", label: "Language", icon: Globe, desc: "Interface language" },
];

function ProfileSection() {
  const { user } = usePortalStore();
  return (
    <div className="space-y-5">
      {/* Avatar */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-secondary)] flex items-center justify-center text-white text-2xl font-bold">
          {user?.name?.charAt(0) ?? "U"}
        </div>
        <div>
          <p className="font-semibold">{user?.name}</p>
          <p className="text-sm text-[var(--foreground)]/50">{user?.email}</p>
          <button className="text-xs text-[var(--color-accent)] mt-1 hover:underline">Change avatar</button>
        </div>
      </div>
      {/* Form fields */}
      {[
        { label: "Full Name", value: user?.name ?? "", icon: User },
        { label: "Email", value: user?.email ?? "", icon: Mail },
        { label: "Country", value: "Singapore", icon: Globe },
      ].map(({ label, value, icon: Icon }) => (
        <div key={label}>
          <label className="text-sm font-medium text-[var(--foreground)]/70 block mb-1.5">{label}</label>
          <div className="relative">
            <Icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--foreground)]/30" />
            <input
              defaultValue={value}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)] text-sm focus:outline-none focus:border-[var(--color-accent)] transition-colors"
            />
          </div>
        </div>
      ))}
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="px-5 py-2.5 rounded-xl bg-[var(--color-accent)] text-white text-sm font-semibold"
      >
        Save Changes
      </motion.button>
    </div>
  );
}

function SecuritySection() {
  const devices = [
    { device: "MacBook Pro", location: "Singapore", lastActive: "Active now", current: true },
    { device: "iPhone 15", location: "Singapore", lastActive: "2h ago", current: false },
    { device: "Chrome / Windows", location: "Hong Kong", lastActive: "3d ago", current: false },
  ];
  return (
    <div className="space-y-6">
      {/* Change password */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Change Password</h3>
        {["Current Password", "New Password", "Confirm Password"].map((label) => (
          <div key={label} className="mb-3">
            <label className="text-sm text-[var(--foreground)]/60 block mb-1.5">{label}</label>
            <div className="relative">
              <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--foreground)]/30" />
              <input type="password" className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)] text-sm focus:outline-none focus:border-[var(--color-accent)] transition-colors" />
            </div>
          </div>
        ))}
        <button className="px-4 py-2 rounded-xl bg-[var(--color-accent)] text-white text-sm font-semibold">
          Update Password
        </button>
      </div>

      {/* 2FA */}
      <div className="p-4 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[var(--color-success)]/10 flex items-center justify-center">
              <Smartphone size={16} className="text-[var(--color-success)]" />
            </div>
            <div>
              <p className="text-sm font-semibold">Two-Factor Authentication</p>
              <p className="text-xs text-[var(--foreground)]/50">Authenticator app enabled</p>
            </div>
          </div>
          <span className="text-xs font-semibold text-[var(--color-success)] bg-[var(--color-success)]/10 px-2.5 py-1 rounded-full">
            ● Enabled
          </span>
        </div>
      </div>

      {/* Devices */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Active Devices</h3>
        <div className="space-y-2">
          {devices.map((d) => (
            <div key={d.device} className="flex items-center gap-3 p-3 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)]">
              <Laptop2 size={16} className="text-[var(--foreground)]/40" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{d.device}</span>
                  {d.current && <span className="text-[10px] bg-[var(--color-accent)]/10 text-[var(--color-accent)] px-1.5 py-0.5 rounded font-semibold">Current</span>}
                </div>
                <p className="text-xs text-[var(--foreground)]/40">{d.location} · {d.lastActive}</p>
              </div>
              {!d.current && (
                <button className="text-xs text-[var(--color-error)] hover:underline">Revoke</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function KYCSection() {
  const { user } = usePortalStore();
  const steps = [
    { label: "Email Verified", done: true },
    { label: "Phone Verified", done: true },
    { label: "Identity Document", done: user?.kycStatus === "verified" },
    { label: "Proof of Address", done: user?.kycStatus === "verified" },
    { label: "KYC Approved", done: user?.kycStatus === "verified" },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-[var(--color-success)]/8 border border-[var(--color-success)]/20">
        <Check size={18} className="text-[var(--color-success)] shrink-0" />
        <div>
          <p className="font-semibold text-[var(--color-success)]">KYC Verified</p>
          <p className="text-sm text-[var(--foreground)]/60">Your identity has been successfully verified.</p>
        </div>
      </div>
      <div className="space-y-2">
        {steps.map((step, i) => (
          <div key={step.label} className="flex items-center gap-3">
            <div className={cn(
              "w-6 h-6 rounded-full flex items-center justify-center shrink-0",
              step.done ? "bg-[var(--color-success)] text-white" : "bg-[var(--border)] text-[var(--foreground)]/30"
            )}>
              {step.done ? <Check size={12} /> : <span className="text-xs">{i + 1}</span>}
            </div>
            <span className={cn("text-sm", step.done ? "text-[var(--foreground)]" : "text-[var(--foreground)]/40")}>
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile");

  const renderContent = () => {
    switch (activeSection) {
      case "profile": return <ProfileSection />;
      case "security": return <SecuritySection />;
      case "verification": return <KYCSection />;
      default:
        return (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-12 h-12 rounded-2xl bg-[var(--surface-elevated)] flex items-center justify-center mb-3">
              {(() => {
                const section = settingsSections.find(s => s.id === activeSection);
                const Icon = section?.icon ?? User;
                return <Icon size={20} className="text-[var(--foreground)]/30" />;
              })()}
            </div>
            <p className="text-[var(--foreground)]/50 text-sm">Coming soon</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your account, security and preferences."
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] overflow-hidden">
            {settingsSections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3.5 text-left transition-all border-b border-[var(--border-light)] last:border-0",
                    isActive
                      ? "bg-[var(--color-accent)]/8 text-[var(--color-accent)]"
                      : "hover:bg-[var(--surface-elevated)] text-[var(--foreground)]/70"
                  )}
                >
                  <Icon size={16} className="shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{section.label}</p>
                  </div>
                  <ChevronRight size={13} className="shrink-0 opacity-30" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className="lg:col-span-3 rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-6"
        >
          <h2 className="font-heading font-semibold mb-5">
            {settingsSections.find((s) => s.id === activeSection)?.label}
          </h2>
          {renderContent()}
        </motion.div>
      </div>
    </div>
  );
}
