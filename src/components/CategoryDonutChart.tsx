import { useState } from 'react';
import { CATEGORY_STATS } from '../data/mockData';
import { CategoryStat, RequestCategory } from '../types';

interface CategoryDonutChartProps {
  onSelectCategory?: (category: RequestCategory) => void;
}

export default function CategoryDonutChart({
  onSelectCategory,
}: CategoryDonutChartProps) {
  const [hoveredCategory, setHoveredCategory] = useState<CategoryStat | null>(null);

  // Math for SVG Donut slices
  const radius = 62;
  const strokeWidth = 26;
  const circumference = 2 * Math.PI * radius; // ~389.55

  let cumulativePercent = 0;

  return (
    <div
      id="card-jenis-permohonan"
      className="bg-[#091b33] border border-[#163761] rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-lg shadow-black/30 h-full"
    >
      {/* Header */}
      <div>
        <h2
          id="title-jenis-permohonan"
          className="text-sm font-bold text-white tracking-wide uppercase"
        >
          JENIS PERMOHONAN
        </h2>
        <p className="text-xs text-slate-300 font-medium mt-0.5">
          (Persentase)
        </p>
      </div>

      {/* Main Content: Donut + Legend */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 my-2 flex-1">
        {/* SVG Donut */}
        <div className="relative w-36 h-36 flex-shrink-0 flex items-center justify-center">
          <svg
            viewBox="0 0 160 160"
            className="w-full h-full transform -rotate-90 select-none"
            aria-label="Grafik Donut Jenis Permohonan"
          >
            {CATEGORY_STATS.map((item) => {
              const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
              const strokeDashoffset = -((cumulativePercent / 100) * circumference);
              cumulativePercent += item.percentage;

              const isHovered = hoveredCategory?.category === item.category;

              return (
                <circle
                  key={item.category}
                  cx="80"
                  cy="80"
                  r={radius}
                  fill="transparent"
                  stroke={item.color}
                  strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setHoveredCategory(item)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  onClick={() => onSelectCategory?.(item.category)}
                />
              );
            })}
          </svg>

          {/* Center text inside donut */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
            {hoveredCategory ? (
              <>
                <span className="text-xl font-bold text-white leading-none">
                  {hoveredCategory.percentage}%
                </span>
                <span className="text-[10px] text-slate-300 font-medium mt-0.5 truncate max-w-[70px]">
                  {hoveredCategory.count} tiket
                </span>
              </>
            ) : (
              <>
                <span className="text-lg font-bold text-white leading-none">
                  100%
                </span>
                <span className="text-[10px] text-slate-400 font-medium mt-0.5">
                  1.257 Total
                </span>
              </>
            )}
          </div>
        </div>

        {/* Legend List */}
        <div
          id="legend-jenis-permohonan"
          className="space-y-1.5 text-xs text-slate-200 w-full sm:w-auto"
        >
          {CATEGORY_STATS.map((item) => {
            const isHovered = hoveredCategory?.category === item.category;
            return (
              <button
                key={item.category}
                type="button"
                className={`w-full flex items-center justify-between sm:justify-start gap-2.5 text-left px-1.5 py-0.5 rounded transition-all cursor-pointer ${
                  isHovered ? 'bg-[#112a4d] text-white' : 'hover:bg-[#0c2240]'
                }`}
                onMouseEnter={() => setHoveredCategory(item)}
                onMouseLeave={() => setHoveredCategory(null)}
                onClick={() => onSelectCategory?.(item.category)}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{
                    backgroundColor: item.color,
                    boxShadow: `0 0 6px ${item.color}`,
                  }}
                />
                <span className="truncate text-slate-200 font-medium">
                  {item.category}
                </span>
                <span className="font-bold text-white ml-auto sm:ml-1">
                  {item.percentage}%
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
