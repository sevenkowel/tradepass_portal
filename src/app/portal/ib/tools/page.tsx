"use client";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/portal/widgets/PageHeader";
export default function Page() {
  return (
    <div>
      <PageHeader title="Coming Soon" description="This module is under development." />
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-2xl bg-[var(--surface-elevated)] flex items-center justify-center mb-4">
          <span className="text-2xl">🚧</span>
        </div>
        <p className="text-[var(--foreground)]/50">This page is being built.</p>
      </motion.div>
    </div>
  );
}
