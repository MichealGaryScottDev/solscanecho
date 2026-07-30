"use client";

interface TimelineData {
  timestamp: number;
  sentiment: "win" | "loss" | "hodl";
  intensity: number;
}

interface Props {
  data: TimelineData[];
}

export function EmotionalTimeline({ data }: Props) {
  // Create SVG path for wave
  const width = 1000;
  const height = 100;
  const step = width / (data.length - 1);

  const points = data.map((d, i) => {
    const x = i * step;
    const baseline = height / 2;
    let yOffset = 0;

    if (d.sentiment === "win") {
      yOffset = -d.intensity * (height / 3);
    } else if (d.sentiment === "loss") {
      yOffset = d.intensity * (height / 3);
    }

    return { x, y: baseline + yOffset, sentiment: d.sentiment };
  });

  const pathData = points
    .map((p, i) => {
      if (i === 0) return `M ${p.x} ${p.y}`;
      const prev = points[i - 1];
      const cpX = (prev.x + p.x) / 2;
      return `Q ${cpX} ${prev.y}, ${p.x} ${p.y}`;
    })
    .join(" ");

  return (
    <div className="rounded-[20px] bg-[#1e1e1e] ring-1 ring-[#2b2b2b] p-5 sm:p-6 space-y-4">
      <div className="space-y-1">
        <h2 className="text-[17px] font-semibold tracking-tight text-[#e4e4e4]">
          Emotional Timeline
        </h2>
        <p className="text-[12px] text-[#5c5c5c]">
          Trading psychology waves based on win/loss streaks and hodl patterns
        </p>
      </div>

      <div className="relative w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-24"
          preserveAspectRatio="none"
        >
          {/* Baseline */}
          <line
            x1="0"
            y1={height / 2}
            x2={width}
            y2={height / 2}
            stroke="#2b2b2b"
            strokeWidth="1"
          />

          {/* Gradient defs */}
          <defs>
            <linearGradient id="winGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4ade80" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#4ade80" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="lossGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f87171" stopOpacity="0" />
              <stop offset="100%" stopColor="#f87171" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Wave path */}
          <path
            d={pathData}
            fill="none"
            stroke="#81a1c1"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Fill areas */}
          {points.map((p, i) => {
            if (i === 0) return null;
            const prev = points[i - 1];
            const isWin = p.y < height / 2;
            const closedPath = `M ${prev.x} ${height / 2} L ${prev.x} ${prev.y} L ${p.x} ${p.y} L ${p.x} ${height / 2} Z`;

            return (
              <path
                key={i}
                d={closedPath}
                fill={isWin ? "url(#winGradient)" : "url(#lossGradient)"}
              />
            );
          })}

          {/* Sentiment dots */}
          {points.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r="3"
              fill={
                p.sentiment === "win"
                  ? "#4ade80"
                  : p.sentiment === "loss"
                  ? "#f87171"
                  : "#60a5fa"
              }
            />
          ))}
        </svg>
      </div>

      <div className="flex items-center justify-center gap-6 pt-2">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
          <span className="text-[11px] text-[#8a8a8a]">Win streaks</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <span className="text-[11px] text-[#8a8a8a]">Loss valleys</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-400" />
          <span className="text-[11px] text-[#8a8a8a]">Hodl calm</span>
        </div>
      </div>
    </div>
  );
}