"use client";

import { useEffect, useState } from "react";
import { EmotionalTimeline } from "@/components/emotional-timeline";
import { TokenHoldings } from "@/components/token-holdings";
import { RecentTrades } from "@/components/recent-trades";
import { BehavioralMetrics } from "@/components/behavioral-metrics";
import { Badge } from "@/components/ui/badge";
import { Copy, ExternalLink } from "lucide-react";

interface WalletData {
  address: string;
  tokens: Array<{
    mint: string;
    symbol: string;
    name: string;
    balance: number;
    usdValue: number;
    change24h: number;
    sparkline: number[];
  }>;
  trades: Array<{
    signature: string;
    type: "swap" | "transfer" | "stake";
    tokenIn?: string;
    tokenOut?: string;
    amountIn?: number;
    amountOut?: number;
    timestamp: number;
  }>;
  timeline: Array<{
    timestamp: number;
    sentiment: "win" | "loss" | "hodl";
    intensity: number;
  }>;
  metrics: {
    avgHoldTime: number;
    winRate: number;
    mostVolatile: string;
    longestHodl: number;
    impulsiveScore: number;
  };
}

export function WalletDashboard({ address }: { address: string }) {
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Simulate fetching wallet data
    // In production, this would call Solana RPC + price APIs
    setTimeout(() => {
      setWalletData(generateMockData(address));
      setLoading(false);
    }, 1200);
  }, [address]);

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 sm:px-5">
        <div className="flex items-center justify-center py-20">
          <div className="space-y-3 text-center">
            <div className="w-10 h-10 rounded-full border-2 border-[#81a1c1] border-t-transparent animate-spin mx-auto" />
            <p className="text-[14px] text-[#8a8a8a]">Loading wallet data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!walletData) {
    return (
      <div className="mx-auto max-w-6xl px-4 sm:px-5">
        <div className="text-center py-20">
          <p className="text-[14px] text-[#8a8a8a]">Failed to load wallet data</p>
        </div>
      </div>
    );
  }

  const totalValue = walletData.tokens.reduce((sum, t) => sum + t.usdValue, 0);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-5 space-y-6">
      {/* Wallet header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-[20px] font-semibold tracking-tight text-[#e4e4e4]">
                Wallet Analysis
              </h1>
              <Badge variant="secondary" className="rounded-full text-[11px]">
                {walletData.tokens.length} tokens
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <code className="font-mono text-[12px] text-[#8a8a8a]">
                {address.slice(0, 8)}...{address.slice(-8)}
              </code>
              <button
                onClick={copyAddress}
                className="p-1 hover:bg-[#1e1e1e] rounded transition-colors"
                title="Copy address"
              >
                <Copy className="w-3.5 h-3.5 text-[#5c5c5c] hover:text-[#8a8a8a]" />
              </button>
              <a
                href={`https://solscan.io/account/${address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 hover:bg-[#1e1e1e] rounded transition-colors"
                title="View on Solscan"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#5c5c5c] hover:text-[#8a8a8a]" />
              </a>
            </div>
            {copied && (
              <p className="text-[11px] text-[#81a1c1]">Copied to clipboard</p>
            )}
          </div>

          <div className="text-right">
            <div className="text-[24px] font-semibold tracking-tight text-[#e4e4e4]">
              ${totalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </div>
            <div className="text-[12px] text-[#5c5c5c]">Total portfolio value</div>
          </div>
        </div>
      </div>

      {/* Emotional Timeline */}
      <EmotionalTimeline data={walletData.timeline} />

      {/* Grid: Behavioral Metrics + Recent Trades */}
      <div className="grid lg:grid-cols-2 gap-6">
        <BehavioralMetrics metrics={walletData.metrics} />
        <RecentTrades trades={walletData.trades} />
      </div>

      {/* Token Holdings */}
      <TokenHoldings tokens={walletData.tokens} />
    </div>
  );
}

// Mock data generator (replace with real Solana RPC calls in production)
function generateMockData(address: string): WalletData {
  const tokens = [
    {
      mint: "So11111111111111111111111111111111111111112",
      symbol: "SOL",
      name: "Solana",
      balance: 12.45,
      usdValue: 1245.67,
      change24h: 3.2,
      sparkline: [98, 102, 100, 105, 103, 108, 110, 107],
    },
    {
      mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
      symbol: "USDC",
      name: "USD Coin",
      balance: 5420.0,
      usdValue: 5420.0,
      change24h: 0.01,
      sparkline: [100, 100, 100, 100, 100, 100, 100, 100],
    },
    {
      mint: "7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj",
      symbol: "BONK",
      name: "Bonk",
      balance: 1200000,
      usdValue: 18.4,
      change24h: -12.5,
      sparkline: [25, 22, 20, 18, 19, 17, 16, 18],
    },
    {
      mint: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
      symbol: "stSOL",
      name: "Lido Staked SOL",
      balance: 8.2,
      usdValue: 860.5,
      change24h: 2.8,
      sparkline: [102, 104, 103, 106, 105, 107, 108, 109],
    },
  ];

  const trades = Array.from({ length: 12 }, (_, i) => ({
    signature: `${i}x${Math.random().toString(36).substring(7)}`,
    type: (["swap", "transfer", "stake"] as const)[Math.floor(Math.random() * 3)],
    tokenIn: i % 2 === 0 ? "SOL" : "USDC",
    tokenOut: i % 2 === 0 ? "BONK" : "SOL",
    amountIn: Math.random() * 100,
    amountOut: Math.random() * 1000,
    timestamp: Date.now() - i * 3600000 * Math.random() * 24,
  }));

  const timeline = Array.from({ length: 30 }, (_, i) => {
    const rand = Math.random();
    return {
      timestamp: Date.now() - i * 86400000,
      sentiment: (rand > 0.6 ? "win" : rand > 0.3 ? "hodl" : "loss") as
        | "win"
        | "loss"
        | "hodl",
      intensity: Math.random() * 0.8 + 0.2,
    };
  }).reverse();

  return {
    address,
    tokens,
    trades,
    timeline,
    metrics: {
      avgHoldTime: 18,
      winRate: 62,
      mostVolatile: "BONK",
      longestHodl: 45,
      impulsiveScore: 3.2,
    },
  };
}