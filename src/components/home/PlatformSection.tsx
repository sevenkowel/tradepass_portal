"use client";

import { motion } from "framer-motion";
import { TrendingUp, Building2, Shield, Rocket, Globe, Layers, Database, Zap } from "lucide-react";

const features = [
  {
    icon: TrendingUp,
    title: "Trading Infrastructure",
    description: "Ultra-low latency order execution with TradePass Server, Order Engine, Pricing Engine, and Execution Engine."
  },
  {
    icon: Building2,
    title: "Broker Platform",
    description: "Complete back-office operations with Broker Portal, Wallet/Payment, KYC, IB System, and Promotion tools."
  },
  {
    icon: Shield,
    title: "Risk Management",
    description: "Real-time monitoring with Risk Engine, Risk Analytics, and Dealer Console for automated risk control."
  },
  {
    icon: Rocket,
    title: "Growth Engine",
    description: "Scale your business with CRM, Marketing Automation, CDP, and Campaign Engine for automated growth."
  },
  {
    icon: Globe,
    title: "Trading Ecosystem",
    description: "Build thriving communities with Copy Trading, Signal, Strategy Hub, and Marketplace integrations."
  },
  {
    icon: Layers,
    title: "Platform Architecture",
    description: "Modular 8-layer architecture designed for scalability, security, and seamless integration."
  },
];

export function PlatformSection() {
  return (
    <section className="section bg-surface relative overflow-hidden">
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
            One Platform. <span className="gradient-text">Everything Brokers Need.</span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            TradePass integrates the entire brokerage lifecycle into a single platform. 
            From trading execution to customer acquisition.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-8 rounded-2xl bg-background border border-border hover:border-accent/30 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <feature.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-foreground/60 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}