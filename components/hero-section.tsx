"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp, TrendingDown, Activity } from "lucide-react";

export function HeroSection() {
  const [address, setAddress] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address.trim()) {
      router.push(`/wallet/${address.trim()}`);
    }
  };

  // Example addresses for quick demo
  const exampleAddresses = [
    "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM",
  ];

  return (
    <section className="py-12 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-5">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left column: Copy + CTA */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#1e1e1e] ring-1 ring-[#2b2b2b] px-3 py-1.5">
              <Activity className="w-3.5 h-3.5 text-[#81a1c1]" />
              <span className="text-[12px] font-medium text-[#8a8a8a]">
                No wallet connection needed
              </span>
            </div>

            <div className="space-y-3">
              <h1 className="text-[32px] sm:text-[42px] font-semibold tracking-tight text-[#e4e4e4] leading-[1.1]">
                Wallet forensics with emotional timeline
              </h1>
              <p className="text-[15px] leading-relaxed text-[#8a8a8a] max-w-lg">
                Paste any Solana wallet address to see token holdings, PnL, and recent
                trades—plus a unique emotional timeline that visualizes your trading
                psychology through color-coded sentiment waves.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Badge variant="secondary" className="rounded-full px-3 py-1 text-[11px]">
                <TrendingUp className="w-3 h-3 mr-1.5 text-green-400" />
                Win streaks
              </Badge>
              <Badge variant="secondary" className="rounded-full px-3 py-1 text-[11px]">
                <TrendingDown className="w-3 h-3 mr-1.5 text-red-400" />
                Loss valleys
              </Badge>
              <Badge variant="secondary" className="rounded-full px-3 py-1 text-[11px]">
                <Activity className="w-3 h-3 mr-1.5 text-blue-400" />
                Hodl calm
              </Badge>
            </div>

            <div className="pt-4 space-y-3" id="examples">
              <p className="text-[12px] font-medium text-[#5c5c5c]">
                Try an example wallet
              </p>
              <div className="flex flex-wrap gap-2">
                {exampleAddresses.map((addr, i) => (
                  <button
                    key={i}
                    onClick={() => router.push(`/wallet/${addr}`)}
                    className="font-mono text-[11px] px-3 py-1.5 rounded-full bg-[#1e1e1e] ring-1 ring-[#2b2b2b] text-[#8a8a8a] hover:text-[#e4e4e4] hover:bg-[#252525] transition-colors"
                  >
                    {addr.slice(0, 4)}...{addr.slice(-4)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right column: Live input panel */}
          <div className="rounded-[20px] bg-muted/40 ring-1 ring-[#2b2b2b] p-6 sm:p-8 space-y-5">
            <div className="space-y-2">
              <h2 className="text-[17px] font-semibold tracking-tight text-[#e4e4e4]">
                Analyze any wallet
              </h2>
              <p className="text-[13px] text-[#8a8a8a]">
                Paste a Solana wallet address to see holdings, trades, and emotional
                timeline
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="wallet-address" className="text-[12px] text-[#5c5c5c]">
                  Wallet address
                </Label>
                <Input
                  id="wallet-address"
                  type="text"
                  placeholder="7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="font-mono text-[13px] bg-[#1e1e1e] ring-1 ring-[#2b2b2b] rounded-[10px] h-11"
                />
              </div>

              <Button
                type="submit"
                className="w-full rounded-full h-11 bg-[#e4e4e4] text-[#141414] hover:bg-[#d4d4d4] font-semibold"
              >
                Analyze wallet
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>

            <div className="pt-4 border-t border-[#2b2b2b]">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-[20px] font-semibold text-[#e4e4e4]">0</div>
                  <div className="text-[11px] text-[#5c5c5c]">Tokens</div>
                </div>
                <div>
                  <div className="text-[20px] font-semibold text-[#e4e4e4]">—</div>
                  <div className="text-[11px] text-[#5c5c5c]">PnL</div>
                </div>
                <div>
                  <div className="text-[20px] font-semibold text-[#e4e4e4]">0</div>
                  <div className="text-[11px] text-[#5c5c5c]">Trades</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}