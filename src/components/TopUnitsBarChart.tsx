import { TOP_UNITS } from '../data/mockData';
import { UnitStat } from '../types';

interface TopUnitsBarChartProps {
  onSelectUnit?: (unitName: string) => void;
}

export default function TopUnitsBarChart({ onSelectUnit }: TopUnitsBarChartProps) {
  const maxCount = 260; // Max reference scale for proportions

  return (
    <div
      id="card-top-units"
      className="bg-[#091b33] border border-[#163761] rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-lg shadow-black/30 h-full"
    >
      {/* Header */}
      <div>
        <h2
          id="title-top-units"
          className="text-sm font-bold text-white tracking-wide uppercase"
        >
          TOP UNIT BERDASARKAN PERMOHONAN
        </h2>
        <p className="text-xs text-slate-300 font-medium mt-0.5">
          (Jumlah)
        </p>
      </div>

      {/* Bar List */}
      <div className="space-y-2.5 my-2">
        {TOP_UNITS.map((unit: UnitStat) => {
          const widthPercent = Math.round((unit.count / maxCount) * 100);

          return (
            <button
              key={unit.name}
              type="button"
              onClick={() => onSelectUnit?.(unit.name)}
              className="w-full flex items-center justify-between gap-3 text-left group hover:bg-[#0c2240] p-1 rounded-lg transition-colors cursor-pointer"
            >
              {/* Unit Name */}
              <span className="text-xs font-semibold text-slate-200 group-hover:text-white w-28 sm:w-32 truncate">
                {unit.name}
              </span>

              {/* Bar Fill Track */}
              <div className="flex-1 bg-[#051121] h-3.5 rounded-full overflow-hidden p-0.5 border border-[#143257]">
                <div
                  className="h-full bg-gradient-to-r from-[#0284c7] to-[#38bdf8] rounded-full transition-all duration-500 group-hover:from-[#0369a1] group-hover:to-[#7dd3fc] shadow-[0_0_8px_rgba(56,189,248,0.4)]"
                  style={{ width: `${widthPercent}%` }}
                />
              </div>

              {/* Number Count */}
              <span className="text-xs font-bold text-white w-8 text-right font-mono">
                {unit.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
