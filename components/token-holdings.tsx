import { TrendingUp, TrendingDown } from "lucide-react";

interface Token {
  mint: string;
  symbol: string;
  name: string;
  balance: number;
  usdValue: number;
  change24h: number;
  sparkline: number[];
}

interface Props {
  tokens: Token[];
}

export function TokenHoldings({ tokens }: Props) {
  return (
    <div className="rounded-[20px] bg-[#1e1e1e] ring-1 ring-[#2b2b2b] overflow-hidden">
      <div className="px-5 py-4 border-b border-[#2b2b2b]">
        <h2 className="text-[17px] font-semibold tracking-tight text-[#e4e4e4]">
          Token Holdings
        </h2>
      </div>

      <div className="divide-y divide-[#2b2b2b]/80">
        {tokens.map((token) => (
          <div
            key={token.mint}
            className="px-5 py-4 hover:bg-[#252525] transition-colors"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[14px] font-semibold text-[#e4e4e4]">
                    {token.symbol}
                  </span>
                  <span className="text-[12px] text-[#5c5c5c] truncate">
                    {token.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <code className="font-mono text-[11px] text-[#8a8a8a]">
                    {token.balance.toLocaleString(undefined, {
                      maximumFractionDigits: 4,
                    })}
                  </code>
                  <span className="text-[11px] text-[#5c5c5c]">•</span>
                  <span className="text-[11px] text-[#8a8a8a]">
                    $
                    {token.usdValue.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Sparkline */}
                <svg viewBox="0 0 80 24" className="w-20 h-6">
                  <polyline
                    points={token.sparkline
                      .map(
                        (val, i) =>
                          `${(i / (token.sparkline.length - 1)) * 80},${
                            24 - (val / 120) * 24
                          }`
                      )
                      .join(" ")}
                    fill="none"
                    stroke={token.change24h >= 0 ? "#4ade80" : "#f87171"}
                    strokeWidth="1.5"
                  />
                </svg>

                {/* 24h change */}
                <div
                  className={`flex items-center gap-1 min-w-[64px] justify-end ${
                    token.change24h >= 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {token.change24h >= 0 ? (
                    <TrendingUp className="w-3.5 h-3.5" />
                  ) : (
                    <TrendingDown className="w-3.5 h-3.5" />
                  )}
                  <span className="text-[13px] font-medium">
                    {Math.abs(token.change24h).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}