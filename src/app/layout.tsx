import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TradePass - The Operating System for Modern Brokers",
  description: "Launch, operate, and scale your brokerage with a unified trading infrastructure and growth platform. TradePass combines trading technology, broker management, and automated growth tools into one platform.",
  keywords: "forex broker, trading platform, broker solution, margin trading, CFD broker, white label, broker software",
  openGraph: {
    title: "TradePass - The Operating System for Modern Brokers",
    description: "Launch, operate, and scale your brokerage with a unified trading infrastructure and growth platform.",
    type: "website",
    locale: "en_US",
    siteName: "TradePass",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`} suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}