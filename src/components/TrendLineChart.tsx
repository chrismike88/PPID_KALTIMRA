import { useState } from 'react';
import { MONTHLY_TRENDS } from '../data/mockData';
import { MonthlyTrend } from '../types';

export default function TrendLineChart() {
  const [hoveredMonth, setHoveredMonth] = useState<MonthlyTrend | null>(null);

  // SVG Chart Dimensions
  const width = 380;
  const height = 140;
  const paddingLeft = 32;
  const paddingRight = 15;
  const paddingTop = 15;
  const paddingBottom = 22;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const maxVal = 1600;
  const minVal = 0;

  // Compute point coordinates
  const points = MONTHLY_TRENDS.map((d, index) => {
    const x = paddingLeft + (index / (MONTHLY_TRENDS.length - 1)) * chartWidth;
    const y = paddingTop + chartHeight - ((d.requests - minVal) / (maxVal - minVal)) * chartHeight;
    return { x, y, data: d };
  });

  // Construct SVG path string for line
  const linePath = points.reduce((acc, curr, idx) => {
    return idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
  }, '');

  // Construct closed path for area fill under the line
  const areaPath = `
    ${linePath}
    L ${points[points.length - 1].x} ${paddingTop + chartHeight}
    L ${points[0].x} ${paddingTop + chartHeight}
    Z
  `;

  return (
    <div
      id="card-tren-permohonan"
      className="bg-[#091b33] border border-[#163761] rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-lg shadow-black/30 h-full relative"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2
            id="title-tren-permohonan"
            className="text-sm font-bold text-white tracking-wide uppercase"
          >
            TREN PERMOHONAN
          </h2>
          <p className="text-xs text-slate-300 font-medium mt-0.5">
            (12 Bulan Terakhir)
          </p>
        </div>

        {hoveredMonth && (
          <div className="text-right">
            <span className="text-xs font-bold text-sky-400">
              {hoveredMonth.requests.toLocaleString('id-ID')}
            </span>
            <span className="text-[10px] text-slate-300 block">
              {hoveredMonth.month} • {hoveredMonth.slaRate}% SLA
            </span>
          </div>
        )}
      </div>

      {/* SVG Chart Area */}
      <div className="relative my-2 w-full">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto max-h-[145px] select-none overflow-visible"
          aria-label="Grafik Tren 12 Bulan Terakhir"
        >
          <defs>
            {/* Gradient fill under curve */}
            <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#0369a1" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#071c36" stopOpacity="0.0" />
            </linearGradient>

            {/* Glowing line shadow */}
            <filter id="glow-line" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#38bdf8" floodOpacity="0.75" />
            </filter>
          </defs>

          {/* Horizontal Grid lines & Y-axis labels matching screenshot: 1500, 1000, 500, 0 */}
          {[1500, 1000, 500, 0].map((val) => {
            const yPos = paddingTop + chartHeight - ((val - minVal) / (maxVal - minVal)) * chartHeight;
            return (
              <g key={val}>
                <line
                  x1={paddingLeft}
                  y1={yPos}
                  x2={width - paddingRight}
                  y2={yPos}
                  stroke="#16345a"
                  strokeWidth="0.8"
                  strokeDasharray={val === 0 ? 'none' : '2,2'}
                />
                <text
                  x={paddingLeft - 6}
                  y={yPos + 3.5}
                  fill="#94a3b8"
                  fontSize="8"
                  textAnchor="end"
                  fontFamily="monospace"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Area Fill */}
          <path d={areaPath} fill="url(#trendGradient)" />

          {/* Glowing Line */}
          <path
            d={linePath}
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2.4"
            filter="url(#glow-line)"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Node Points on hover & default */}
          {points.map((pt, i) => {
            const isHovered = hoveredMonth?.month === pt.data.month;
            return (
              <g key={i}>
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? 5 : 2.5}
                  fill={isHovered ? '#ffffff' : '#38bdf8'}
                  stroke="#071b36"
                  strokeWidth="1.5"
                  className="transition-all duration-200 cursor-pointer"
                  onMouseEnter={() => setHoveredMonth(pt.data)}
                  onMouseLeave={() => setHoveredMonth(null)}
                />
                {/* Transparent wider target for easy hover */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r="10"
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredMonth(pt.data)}
                  onMouseLeave={() => setHoveredMonth(null)}
                />
              </g>
            );
          })}

          {/* X-axis Month Labels */}
          {points.map((pt, i) => (
            <text
              key={i}
              x={pt.x}
              y={height - 4}
              fill={hoveredMonth?.month === pt.data.month ? '#ffffff' : '#94a3b8'}
              fontSize="7.5"
              fontWeight={hoveredMonth?.month === pt.data.month ? 'bold' : 'normal'}
              textAnchor="middle"
              fontFamily="sans-serif"
            >
              {pt.data.month}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
}
