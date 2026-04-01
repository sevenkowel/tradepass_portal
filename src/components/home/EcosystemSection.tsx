"use client";

import { motion } from "framer-motion";
import { Users, Signal, ShoppingBag, Puzzle } from "lucide-react";

const ecosystems = [
  {
    icon: Users,
    title: "Copy Trading",
    description: "Enable top traders to share strategies and earn performance fees.",
  },
  {
    icon: Signal,
    title: "Signal Services",
    description: "Integrate third-party signals for automated trading recommendations.",
  },
  {
    icon: ShoppingBag,
    title: "Strategy Marketplace",
    description: "Create a vibrant marketplace for trading strategies and indicators.",
  },
  {
    icon: Puzzle,
    title: "Partner Integrations",
    description: "Connect with liquidity providers, payment gateways, and more.",
  },
];

export function EcosystemSection() {
  return (
    <section className="section bg-background relative overflow-hidden">
      <div className="container-main">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
            Build Your Trading{" "}
            <span className="gradient-text">Ecosystem</span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            TradePass enables brokers to create thriving trading communities through 
            our comprehensive ecosystem tools.
          </p>
        </motion.div>

        {/* Ecosystem Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ecosystems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-8 rounded-2xl bg-surface border border-border hover:border-accent/30 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/10 to-secondary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <item.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {item.title}
              </h3>
              <p className="text-foreground/60 text-sm">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}