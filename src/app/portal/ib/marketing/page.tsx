"use client";

import { motion } from "framer-motion";
import {
  Image,
  Globe,
  Share2,
  Download,
  Copy,
  Check,
  ExternalLink,
  Palette,
  Smartphone,
  Monitor,
} from "lucide-react";
import { PageHeader } from "@/components/portal/widgets/PageHeader";
import { cn } from "@/lib/utils";
import { useState } from "react";

// ─── Mock Data ─────────────────────────────────────────────
const banners = [
  {
    id: 1,
    name: "728x90 Leaderboard",
    size: "728 x 90",
    type: "Banner",
    preview: "Leaderboard",
    colors: ["bg-blue-600", "bg-blue-800"],
  },
  {
    id: 2,
    name: "300x250 Medium Rectangle",
    size: "300 x 250",
    type: "Banner",
    preview: "Rectangle",
    colors: ["bg-emerald-500", "bg-emerald-700"],
  },
  {
    id: 3,
    name: "160x600 Wide Skyscraper",
    size: "160 x 600",
    type: "Banner",
    preview: "Skyscraper",
    colors: ["bg-purple-500", "bg-purple-700"],
  },
  {
    id: 4,
    name: "320x50 Mobile Banner",
    size: "320 x 50",
    type: "Mobile",
    preview: "Mobile",
    colors: ["bg-amber-500", "bg-orange-600"],
  },
];

const landingPages = [
  {
    id: 1,
    name: "Trading Platform",
    description: "Highlight our advanced MT5 trading platform",
    url: "https://tradepass.com/lp/trading",
    icon: Monitor,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    id: 2,
    name: "Copy Trading",
    description: "Promote our copy trading features",
    url: "https://tradepass.com/lp/copy-trading",
    icon: Share2,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    id: 3,
    name: "AI Signals",
    description: "Showcase AI-powered trading signals",
    url: "https://tradepass.com/lp/ai-signals",
    icon: Globe,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    id: 4,
    name: "Mobile App",
    description: "Promote mobile trading experience",
    url: "https://tradepass.com/lp/mobile",
    icon: Smartphone,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
];

// ─── Components ────────────────────────────────────────────
function BannerCard({ banner }: { banner: (typeof banners)[0] }) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    const code = `<a href="https://tradepass.com/ref/YOUR_CODE" target="_blank">
  <img src="https://tradepass.com/banners/${banner.id}.gif" alt="TradePass" />
</a>`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-200 p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-800">{banner.name}</h3>
          <p className="text-sm text-gray-500">{banner.size}</p>
        </div>
        <span
          className={cn(
            "text-xs font-medium px-2 py-1 rounded-lg",
            banner.type === "Mobile"
              ? "bg-amber-50 text-amber-700"
              : "bg-blue-50 text-blue-700"
          )}
        >
          {banner.type}
        </span>
      </div>

      {/* Preview */}
      <div
        className={cn(
          "rounded-xl flex items-center justify-center mb-4",
          banner.size === "728 x 90" ? "h-16" :
          banner.size === "300 x 250" ? "h-40" :
          banner.size === "160 x 600" ? "h-48" : "h-12"
        )}
        style={{
          background: `linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to))`,
        }}
      >
        <div className={cn("w-full h-full rounded-xl bg-gradient-to-br flex items-center justify-center", banner.colors[0], banner.colors[1])}>
          <span className="text-white font-bold text-sm">TradePass {banner.preview}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={copyCode}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 text-sm font-medium hover:bg-blue-100 transition-colors"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied!" : "Copy Code"}
        </button>
        <button className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-100 transition-colors">
          <Download size={14} />
        </button>
      </div>
    </div>
  );
}

function LandingPageCard({ page }: { page: (typeof landingPages)[0] }) {
  const Icon = page.icon;
  const [copied, setCopied] = useState(false);

  const copyUrl = () => {
    navigator.clipboard.writeText(`${page.url}?ref=YOUR_CODE`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-200 p-5 hover:border-blue-300 transition-colors">
      <div className="flex items-start gap-4">
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0", page.iconBg)}>
          <Icon size={22} className={page.iconColor} />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800">{page.name}</h3>
          <p className="text-sm text-gray-500">{page.description}</p>
          <div className="flex items-center gap-2 mt-3">
            <code className="flex-1 text-xs bg-gray-50 px-2 py-1 rounded text-gray-600 truncate">
              {page.url}?ref=YOUR_CODE
            </code>
            <button
              onClick={copyUrl}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {copied ? (
                <Check size={14} className="text-emerald-600" />
              ) : (
                <Copy size={14} className="text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────
export default function MarketingToolsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Marketing Tools"
        description="Promotional materials to help you attract new clients"
      />

      {/* Banner Ads */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border-2 border-gray-200 p-5"
      >
        <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center">
            <Image size={14} className="text-blue-600" />
          </div>
          Banner Ads
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {banners.map((banner) => (
            <BannerCard key={banner.id} banner={banner} />
          ))}
        </div>
      </motion.div>

      {/* Landing Pages */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl border-2 border-gray-200 p-5"
      >
        <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center">
            <Globe size={14} className="text-emerald-600" />
          </div>
          Landing Pages
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {landingPages.map((page) => (
            <LandingPageCard key={page.id} page={page} />
          ))}
        </div>
      </motion.div>

      {/* Custom Branding */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200 p-5"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center shrink-0">
            <Palette size={24} className="text-white" />
          </div>
          <div className="flex-1">
            <h2 className="font-bold text-gray-800">Need Custom Materials?</h2>
            <p className="text-sm text-gray-600 mt-1">
              Contact our marketing team for custom-branded materials tailored to your audience.
            </p>
            <button className="mt-3 bg-blue-600 text-white font-semibold px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors text-sm">
              Request Custom Materials
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
