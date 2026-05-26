import React from "react";
import { Sparkles } from "@/components/icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function WeeklyLineChart({ data }) {
  const width = 640;
  const height = 210;
  const padding = 24;
  const max = Math.max(1, ...data.map((item) => item.mg));
  const points = data.map((item, index) => {
    const x = padding + (index * (width - padding * 2)) / (data.length - 1 || 1);
    const y = height - padding - (item.mg / max) * (height - padding * 2);
    return { ...item, x, y };
  });
  const path = points.map((point, index) => `${index ? "L" : "M"} ${point.x} ${point.y}`).join(" ");
  const area = `${path} L ${width - padding} ${height - padding} L ${padding} ${height - padding} Z`;

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>本周清醒曲线</CardTitle>
          <p className="mt-1 text-xs text-muted-foreground">每一次续航，都会在夜色里留下脉冲</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-primary">
          <Sparkles className="h-4 w-4" />
          实时脉冲
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[230px] rounded-md border border-white/10 bg-white/[0.025] p-3">
          <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full">
            <defs>
              <linearGradient id="line" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#32ff9a" />
                <stop offset="100%" stopColor="#2bb7ff" />
              </linearGradient>
              <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#32ff9a" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#32ff9a" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[0.25, 0.5, 0.75].map((line) => (
              <line
                key={line}
                x1={padding}
                x2={width - padding}
                y1={height * line}
                y2={height * line}
                stroke="rgba(255,255,255,0.08)"
              />
            ))}
            <path d={area} fill="url(#area)" />
            <path d={path} fill="none" stroke="url(#line)" strokeLinecap="round" strokeWidth="4" />
            {points.map((point) => (
              <g key={point.day}>
                <circle cx={point.x} cy={point.y} r="5" fill="#071016" stroke="#32ff9a" strokeWidth="3" />
                <text x={point.x} y={height - 4} fill="rgba(236,252,250,0.62)" fontSize="13" textAnchor="middle">
                  {point.day}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </CardContent>
    </Card>
  );
}
