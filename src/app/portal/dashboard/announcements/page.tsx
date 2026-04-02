"use client";

import { motion } from "framer-motion";
import {
  Bell,
  Megaphone,
  Sparkles,
  Wrench,
  Shield,
  ChevronRight,
  Clock,
  ExternalLink,
} from "lucide-react";
import { PageHeader } from "@/components/portal/widgets/PageHeader";
import { cn } from "@/lib/utils";
import Link from "next/link";

// ─── Mock Data ─────────────────────────────────────────────
const announcements = [
  {
    id: 1,
    type: "feature",
    title: "New AI Signal Models Released",
    description: "We're excited to announce the launch of 3 new deep learning models for Forex signals. These models have been trained on over 10 years of market data and offer improved accuracy for major currency pairs.",
    date: "Jul 28, 2025",
    time: "2 hours ago",
    icon: Sparkles,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    borderColor: "border-amber-200",
    isNew: true,
    link: "/portal/ai-signals/feed",
  },
  {
    id: 2,
    type: "promo",
    title: "Summer Trading Bonus — Up to 30%",
    description: "Deposit and trade during our summer promotion to earn bonus rewards. The more you deposit, the higher your bonus percentage. Limited time offer until August 31st!",
    date: "Jul 25, 2025",
    time: "3 days ago",
    icon: Megaphone,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    borderColor: "border-blue-200",
    isNew: false,
    link: "/portal/dashboard/promotions",
  },
  {
    id: 3,
    type: "maintenance",
    title: "Scheduled System Maintenance",
    description: "We will be performing scheduled maintenance on our trading servers this Saturday from 02:00 to 04:00 UTC. During this time, trading services may be temporarily unavailable.",
    date: "Jul 24, 2025",
    time: "4 days ago",
    icon: Wrench,
    iconBg: "bg-gray-50",
    iconColor: "text-gray-600",
    borderColor: "border-gray-200",
    isNew: false,
    link: null,
  },
  {
    id: 4,
    type: "security",
    title: "Security Update: Enhanced 2FA",
    description: "We've upgraded our two-factor authentication system to support additional authenticator apps. We strongly recommend all users enable 2FA for enhanced account security.",
    date: "Jul 20, 2025",
    time: "1 week ago",
    icon: Shield,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    borderColor: "border-emerald-200",
    isNew: false,
    link: "/portal/settings/security",
  },
  {
    id: 5,
    type: "feature",
    title: "Copy Trading 2.0 is Live",
    description: "Our redesigned Copy Trading platform is now available. Enjoy improved trader discovery, better risk management tools, and real-time performance tracking.",
    date: "Jul 15, 2025",
    time: "2 weeks ago",
    icon: Sparkles,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    borderColor: "border-purple-200",
    isNew: false,
    link: "/portal/copy-trading/discover",
  },
];

const categories = [
  { id: "all", label: "All", count: 5 },
  { id: "feature", label: "New Features", count: 2 },
  { id: "promo", label: "Promotions", count: 1 },
  { id: "maintenance", label: "Maintenance", count: 1 },
  { id: "security", label: "Security", count: 1 },
];

// ─── Components ────────────────────────────────────────────
function AnnouncementCard({ announcement }: { announcement: (typeof announcements)[0] }) {
  const Icon = announcement.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "bg-white rounded-2xl border-2 p-5 transition-all duration-200",
        announcement.isNew
          ? "border-blue-300 shadow-sm"
          : "border-gray-200 hover:border-blue-300 hover:shadow-md"
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
            announcement.iconBg,
            announcement.borderColor,
            "border-2"
          )}
        >
          <Icon size={22} className={announcement.iconColor} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-gray-800">{announcement.title}</h3>
                {announcement.isNew && (
                  <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                    NEW
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                {announcement.description}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400">{announcement.date}</span>
              <span className="text-xs text-gray-300">•</span>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Clock size={11} />
                {announcement.time}
              </span>
            </div>
            {announcement.link && (
              <Link
                href={announcement.link}
                className="text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-1"
              >
                Learn more <ChevronRight size={12} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Page ─────────────────────────────────────────────
export default function AnnouncementsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Announcements"
        description="Stay updated with the latest news, features, and platform updates"
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border-2 border-gray-200 p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border-2 border-blue-200 flex items-center justify-center">
              <Bell size={18} className="text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">5</p>
              <p className="text-xs text-gray-500">Total Updates</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-white rounded-2xl border-2 border-gray-200 p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border-2 border-amber-200 flex items-center justify-center">
              <Sparkles size={18} className="text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">2</p>
              <p className="text-xs text-gray-500">New Features</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border-2 border-gray-200 p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center">
              <Shield size={18} className="text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">1</p>
              <p className="text-xs text-gray-500">Security</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-2xl border-2 border-gray-200 p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 border-2 border-purple-200 flex items-center justify-center">
              <Megaphone size={18} className="text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">1</p>
              <p className="text-xs text-gray-500">Promotions</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border-2",
              cat.id === "all"
                ? "bg-blue-50 text-blue-700 border-blue-200"
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
            )}
          >
            {cat.label}
            <span className="ml-2 text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-md">
              {cat.count}
            </span>
          </button>
        ))}
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {announcements.map((announcement, index) => (
          <motion.div
            key={announcement.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <AnnouncementCard announcement={announcement} />
          </motion.div>
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center">
        <button className="text-sm font-semibold text-gray-600 bg-white border-2 border-gray-200 px-6 py-2.5 rounded-xl hover:border-gray-300 transition-colors">
          Load More
        </button>
      </div>
    </div>
  );
}

import { useState } from "react";
