"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Check,
  Clock,
  ChevronRight,
  Type,
  Monitor,
} from "lucide-react";
import { PageHeader } from "@/components/portal/widgets/PageHeader";
import { cn } from "@/lib/utils";

// ─── Mock Data ─────────────────────────────────────────────
const languages = [
  { id: "en", name: "English", flag: "🇺🇸", native: "English", isDefault: true },
  { id: "zh", name: "中文", flag: "🇨🇳", native: "简体中文", isDefault: false },
  { id: "ja", name: "日本語", flag: "🇯🇵", native: "Japanese", isDefault: false },
  { id: "ko", name: "한국어", flag: "🇰🇷", native: "Korean", isDefault: false },
  { id: "es", name: "Español", flag: "🇪🇸", native: "Spanish", isDefault: false },
  { id: "fr", name: "Français", flag: "🇫🇷", native: "French", isDefault: false },
  { id: "de", name: "Deutsch", flag: "🇩🇪", native: "German", isDefault: false },
  { id: "pt", name: "Português", flag: "🇧🇷", native: "Portuguese", isDefault: false },
  { id: "ru", name: "Русский", flag: "🇷🇺", native: "Russian", isDefault: false },
  { id: "ar", name: "العربية", flag: "🇸🇦", native: "Arabic", isDefault: false },
];

const regions = [
  { id: "auto", name: "Auto-detect", description: "Based on your location" },
  { id: "utc", name: "UTC", description: "Coordinated Universal Time" },
  { id: "est", name: "EST (New York)", description: "Eastern Standard Time" },
  { id: "gmt", name: "GMT (London)", description: "Greenwich Mean Time" },
  { id: "jst", name: "JST (Tokyo)", description: "Japan Standard Time" },
  { id: "cst", name: "CST (Shanghai)", description: "China Standard Time" },
];

// ─── Components ────────────────────────────────────────────
function LanguageCard({
  lang,
  selected,
  onSelect,
}: {
  lang: (typeof languages)[0];
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all",
        selected
          ? "border-blue-500 bg-blue-50"
          : "border-gray-200 hover:border-blue-300 bg-white"
      )}
    >
      <span className="text-2xl">{lang.flag}</span>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="font-semibold text-gray-800">{lang.name}</p>
          {lang.isDefault && (
            <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">
              Default
            </span>
          )}
        </div>
        <p className="text-sm text-gray-500">{lang.native}</p>
      </div>
      {selected && (
        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
          <Check size={14} className="text-white" />
        </div>
      )}
    </button>
  );
}

// ─── Main Page ─────────────────────────────────────────────
export default function LanguageSettingsPage() {
  const [selectedLang, setSelectedLang] = useState("en");
  const [selectedRegion, setSelectedRegion] = useState("auto");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Language & Region"
        description="Choose your preferred language and regional settings"
      />

      {/* Current Selection */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border-2 border-gray-200 p-5"
      >
        <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center">
            <Globe size={14} className="text-blue-600" />
          </div>
          Current Settings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
            <span className="text-3xl">
              {languages.find((l) => l.id === selectedLang)?.flag}
            </span>
            <div>
              <p className="text-sm text-gray-500">Language</p>
              <p className="font-semibold text-gray-800">
                {languages.find((l) => l.id === selectedLang)?.name}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <Clock size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Time Zone</p>
              <p className="font-semibold text-gray-800">
                {regions.find((r) => r.id === selectedRegion)?.name}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Language Selection */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl border-2 border-gray-200 p-5"
      >
        <h2 className="font-bold text-gray-800 mb-4">Select Language</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {languages.map((lang) => (
            <LanguageCard
              key={lang.id}
              lang={lang}
              selected={selectedLang === lang.id}
              onSelect={() => setSelectedLang(lang.id)}
            />
          ))}
        </div>
      </motion.div>

      {/* Time Zone */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl border-2 border-gray-200 p-5"
      >
        <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center">
            <Clock size={14} className="text-emerald-600" />
          </div>
          Time Zone
        </h2>
        <div className="space-y-2">
          {regions.map((region) => (
            <button
              key={region.id}
              onClick={() => setSelectedRegion(region.id)}
              className={cn(
                "w-full flex items-center justify-between p-4 rounded-xl border-2 text-left transition-all",
                selectedRegion === region.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-blue-300 bg-white"
              )}
            >
              <div>
                <p className="font-semibold text-gray-800">{region.name}</p>
                <p className="text-sm text-gray-500">{region.description}</p>
              </div>
              {selectedRegion === region.id && (
                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                  <Check size={14} className="text-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Additional Settings */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl border-2 border-gray-200 p-5"
      >
        <h2 className="font-bold text-gray-800 mb-4">Additional Settings</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <Type size={18} className="text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Number Format</p>
                <p className="text-sm text-gray-500">1,234.56 (US format)</p>
              </div>
            </div>
            <button className="text-sm text-blue-600 font-medium">Change</button>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                <Monitor size={18} className="text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Date Format</p>
                <p className="text-sm text-gray-500">MM/DD/YYYY</p>
              </div>
            </div>
            <button className="text-sm text-blue-600 font-medium">Change</button>
          </div>
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
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
