"use client";

import Link from "next/link";
import { TrendingUp, Building2, Shield, Rocket, Globe, FileText, Mail, Send, Code, MessageCircle } from "lucide-react";

const products = [
  { name: "Trading Infrastructure", href: "/products/trading-infrastructure" },
  { name: "TradePass Server", href: "/products/tradepass-server" },
  { name: "Order Engine", href: "/products/order-engine" },
  { name: "Pricing Engine", href: "/products/pricing-engine" },
  { name: "Execution Engine", href: "/products/execution-engine" },
];

const brokerPlatform = [
  { name: "Broker Portal", href: "/products/broker-portal" },
  { name: "Wallet / Payment", href: "/products/wallet-payment" },
  { name: "KYC", href: "/products/kyc" },
  { name: "IB System", href: "/products/ib-system" },
  { name: "Promotion", href: "/products/promotion" },
];

const riskManagement = [
  { name: "Risk Engine", href: "/products/risk-engine" },
  { name: "Risk Analytics", href: "/products/risk-analytics" },
  { name: "Dealer Console", href: "/products/dealer-console" },
];

const growthEngine = [
  { name: "CRM", href: "/products/crm" },
  { name: "Marketing Automation", href: "/products/marketing-automation" },
  { name: "CDP", href: "/products/cdp" },
  { name: "Campaign Engine", href: "/products/campaign-engine" },
];

const ecosystem = [
  { name: "Copy Trading", href: "/ecosystem/copy-trading" },
  { name: "Signal", href: "/ecosystem/signal" },
  { name: "Strategy Hub", href: "/ecosystem/strategy-hub" },
  { name: "Marketplace", href: "/ecosystem/marketplace" },
];

const solutions = [
  { name: "Startup Broker", href: "/solutions/startup-broker" },
  { name: "Growth Broker", href: "/solutions/growth-broker" },
  { name: "Enterprise Broker", href: "/solutions/enterprise-broker" },
];

const resources = [
  { name: "Blog", href: "/resources/blog" },
  { name: "Industry Insights", href: "/resources/insights" },
  { name: "Documentation", href: "/resources/docs" },
  { name: "API Docs", href: "/resources/api" },
  { name: "Whitepaper", href: "/resources/whitepaper" },
];

const company = [
  { name: "About TradePass", href: "/company/about" },
  { name: "Vision", href: "/company/vision" },
  { name: "Team", href: "/company/team" },
  { name: "Careers", href: "/company/careers" },
];

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="container-main py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <span className="text-primary font-bold text-xl">T</span>
              </div>
              <span className="font-heading font-bold text-xl text-foreground">TradePass</span>
            </Link>
            <p className="text-foreground/60 text-sm mb-6 max-w-xs">
              The Operating System for Modern Brokers. Launch, operate, and scale your brokerage with a unified trading infrastructure and growth platform.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-lg bg-surface-elevated hover:bg-accent/10 transition-colors text-foreground/60 hover:text-accent">
                <Send className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-surface-elevated hover:bg-accent/10 transition-colors text-foreground/60 hover:text-accent">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-surface-elevated hover:bg-accent/10 transition-colors text-foreground/60 hover:text-accent">
                <Code className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Products</h4>
            <ul className="space-y-3">
              {products.map((item, index) => (
                <li key={index}>
                  <Link href={item.href} className="text-sm text-foreground/60 hover:text-accent transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Broker Platform */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Broker Platform</h4>
            <ul className="space-y-3">
              {brokerPlatform.map((item, index) => (
                <li key={index}>
                  <Link href={item.href} className="text-sm text-foreground/60 hover:text-accent transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Risk & Growth */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Risk & Growth</h4>
            <ul className="space-y-3">
              {riskManagement.map((item, index) => (
                <li key={index}>
                  <Link href={item.href} className="text-sm text-foreground/60 hover:text-accent transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
              {growthEngine.slice(0, 2).map((item, index) => (
                <li key={`ge-${index}`}>
                  <Link href={item.href} className="text-sm text-foreground/60 hover:text-accent transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions & Company */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Solutions</h4>
            <ul className="space-y-3 mb-6">
              {solutions.map((item, index) => (
                <li key={index}>
                  <Link href={item.href} className="text-sm text-foreground/60 hover:text-accent transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {company.map((item, index) => (
                <li key={index}>
                  <Link href={item.href} className="text-sm text-foreground/60 hover:text-accent transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-foreground/40">
            © 2026 TradePass. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-sm text-foreground/40 hover:text-foreground/60 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-foreground/40 hover:text-foreground/60 transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="text-sm text-foreground/40 hover:text-foreground/60 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}