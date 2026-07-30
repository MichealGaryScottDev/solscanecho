import { ArrowRight, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Trade {
  signature: string;
  type: "swap" | "transfer" | "stake";
  tokenIn?: string;
  tokenOut?: string;
  amountIn?: number;
  amountOut?: number;
  timestamp: number;
}

interface Props {
  trades: Trade[];
}

export function RecentTrades({ trades }: Props) {
  const formatTime = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return `${Math.floor(diff / 60000)}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const typeColors = {
    swap: "bg-[#81a1c1]/20 text-[#81a1c1]",
    transfer: "bg-[#8a8a8a]/20 text-[#8a8a8a]",
    stake: "bg-purple-400/20 text-purple-400",
  };

  return (
    <div className="rounded-[20px] bg-[#1e1e1e] ring-1 ring-[#2b2b2b] overflow-hidden">
      <div className="px-5 py-4 border-b border-[#2b2b2b]">
        <h2 className="text-[17px] font-semibold tracking-tight text-[#e4e4e4]">
          Recent Trades
        </h2>
      </div>

      <div className="divide-y divide-[#2b2b2b]/80 max-h-[400px] overflow-y-auto">
        {trades.slice(0, 8).map((trade) => (
          <div
            key={trade.signature}
            className="px-5 py-3.5 hover:bg-[#252525] transition-colors"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className={`rounded-full text-[10px] px-2 py-0.5 ${
                      typeColors[trade.type]
                    }`}
                  >
                    {trade.type}
                  </Badge>
                  <span className="text-[11px] text-[#5c5c5c]">
                    {formatTime(trade.timestamp)}
                  </span>
                </div>

                {trade.type === "swap" && trade.tokenIn && trade.tokenOut && (
                  <div className="flex items-center gap-1.5 text-[13px] text-[#e4e4e4]">
                    <code className="font-mono">
                      {trade.amountIn?.toFixed(2)} {trade.tokenIn}
                    </code>
                    <ArrowRight className="w-3 h-3 text-[#5c5c5c]" />
                    <code className="font-mono">
                      {trade.amountOut?.toFixed(2)} {trade.tokenOut}
                    </code>
                  </div>
                )}

                <code className="font-mono text-[10px] text-[#5c5c5c] block truncate">
                  {trade.signature.slice(0, 16)}...
                </code>
              </div>

              <a
                href={`https://solscan.io/tx/${trade.signature}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 hover:bg-[#2b2b2b] rounded transition-colors"
                title="View on Solscan"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#5c5c5c] hover:text-[#8a8a8a]" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}