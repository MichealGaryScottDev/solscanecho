import { TrendingUp, Clock, Zap, Target } from "lucide-react";

interface Metrics {
  avgHoldTime: number;
  winRate: number;
  mostVolatile: string;
  longestHodl: number;
  impulsiveScore: number;
}

interface Props {
  metrics: Metrics;
}

export function BehavioralMetrics({ metrics }: Props) {
  const metricsList = [
    {
      icon: Clock,
      label: "Avg hold time",
      value: `${metrics.avgHoldTime} days`,
      color: "text-blue-400",
    },
    {
      icon: Target,
      label: "Win rate",
      value: `${metrics.winRate}%`,
      color: "text-green-400",
    },
    {
      icon: TrendingUp,
      label: "Most volatile",
      value: metrics.mostVolatile,
      color: "text-orange-400",
    },
    {
      icon: Clock,
      label: "Longest hodl",
      value: `${metrics.longestHodl} days`,
      color: "text-purple-400",
    },
    {
      icon: Zap,
      label: "Impulsive score",
      value: metrics.impulsiveScore.toFixed(1),
      color: "text-red-400",
    },
  ];

  return (
    <div className="rounded-[20px] bg-[#1e1e1e] ring-1 ring-[#2b2b2b] overflow-hidden">
      <div className="px-5 py-4 border-b border-[#2b2b2b]">
        <h2 className="text-[17px] font-semibold tracking-tight text-[#e4e4e4]">
          Behavioral Metrics
        </h2>
      </div>

      <div className="p-5 space-y-4">
        {metricsList.map((metric, i) => (
          <div
            key={i}
            className="flex items-center justify-between py-2.5 px-3 rounded-[10px] bg-[#181818] ring-1 ring-[#2b2b2b]"
          >
            <div className="flex items-center gap-3">
              <metric.icon className={`w-4 h-4 ${metric.color}`} />
              <span className="text-[13px] text-[#8a8a8a]">{metric.label}</span>
            </div>
            <code className="font-mono text-[14px] font-semibold text-[#e4e4e4]">
              {metric.value}
            </code>
          </div>
        ))}

        <div className="pt-3 border-t border-[#2b2b2b]">
          <p className="text-[11px] text-[#5c5c5c] leading-relaxed">
            Metrics calculated from on-chain transaction patterns. Impulsive score
            measures frequency of trades within short windows.
          </p>
        </div>
      </div>
    </div>
  );
}