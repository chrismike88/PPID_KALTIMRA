import { DashboardMetrics, ServiceStatus } from '../types';

interface MetricCardsProps {
  metrics: DashboardMetrics;
  onFilterStatus?: (status: ServiceStatus | 'Semua') => void;
  onOpenRequests: () => void;
}

export default function MetricCards({
  metrics,
  onFilterStatus,
  onOpenRequests,
}: MetricCardsProps) {
  // Format numbers to Indonesian standard: 1.257, 98,6%, 1,82
  const formattedTotal = metrics.totalRequests.toLocaleString('id-ID');
  const formattedSla = metrics.slaAchievement.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + '%';
  const formattedAvgDays = metrics.averageDays.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const formattedUnits = metrics.activeUnits.toString();

  const selesaiPct = metrics.statusBreakdown.selesai.percentage.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + '%';
  const prosesPct = metrics.statusBreakdown.proses.percentage.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + '%';
  const tertundaPct = metrics.statusBreakdown.tertunda.percentage.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + '%';

  return (
    <section
      id="section-metric-cards"
      aria-label="Ringkasan Metrik Utama PPID"
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5"
    >
      {/* Card 1: Permohonan */}
      <button
        id="card-metric-permohonan"
        type="button"
        onClick={onOpenRequests}
        className="bg-[#091b33] hover:bg-[#0d2342] border border-[#163761] hover:border-sky-500/60 rounded-2xl p-4 sm:p-5 flex flex-col justify-center items-start text-left shadow-lg shadow-black/30 transition-all duration-200 group cursor-pointer"
      >
        <span
          id="val-total-permohonan"
          className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-[#f59e0b] tracking-tight leading-none group-hover:scale-105 transition-transform origin-left"
        >
          {formattedTotal}
        </span>
        <span
          id="label-total-permohonan"
          className="text-white text-sm sm:text-base font-semibold mt-2.5 tracking-wide flex items-center gap-1.5"
        >
          Permohonan
        </span>
      </button>

      {/* Card 2: SLA Tercapai */}
      <button
        id="card-metric-sla"
        type="button"
        onClick={() => {
          onFilterStatus?.('Selesai');
          onOpenRequests();
        }}
        className="bg-[#091b33] hover:bg-[#0d2342] border border-[#163761] hover:border-sky-500/60 rounded-2xl p-4 sm:p-5 flex flex-col justify-center items-start text-left shadow-lg shadow-black/30 transition-all duration-200 group cursor-pointer"
      >
        <span
          id="val-sla-tercapai"
          className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-[#f59e0b] tracking-tight leading-none group-hover:scale-105 transition-transform origin-left"
        >
          {formattedSla}
        </span>
        <span
          id="label-sla-tercapai"
          className="text-white text-sm sm:text-base font-semibold mt-2.5 tracking-wide"
        >
          SLA Tercapai
        </span>
      </button>

      {/* Card 3: Rata-rata Hari */}
      <div
        id="card-metric-avg-days"
        className="bg-[#091b33] border border-[#163761] rounded-2xl p-4 sm:p-5 flex flex-col justify-center items-start text-left shadow-lg shadow-black/30"
      >
        <span
          id="val-avg-days"
          className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-[#f59e0b] tracking-tight leading-none"
        >
          {formattedAvgDays}
        </span>
        <span
          id="label-avg-days"
          className="text-white text-sm sm:text-base font-semibold mt-2.5 tracking-wide"
        >
          Rata-rata Hari
        </span>
      </div>

      {/* Card 4: Unit Aktif */}
      <div
        id="card-metric-active-units"
        className="bg-[#091b33] border border-[#163761] rounded-2xl p-4 sm:p-5 flex flex-col justify-center items-start text-left shadow-lg shadow-black/30"
      >
        <span
          id="val-active-units"
          className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-white tracking-tight leading-none"
        >
          {formattedUnits}
        </span>
        <span
          id="label-active-units"
          className="text-white text-sm sm:text-base font-semibold mt-2.5 tracking-wide"
        >
          Unit Aktif
        </span>
      </div>

      {/* Card 5: STATUS LAYANAN */}
      <div
        id="card-metric-service-status"
        className="col-span-2 sm:col-span-1 bg-[#091b33] border border-[#163761] rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between shadow-lg shadow-black/30"
      >
        <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-2">
          STATUS LAYANAN
        </div>
        <div className="space-y-1.5 text-xs sm:text-[13px]">
          {/* Row Selesai */}
          <button
            type="button"
            onClick={() => {
              onFilterStatus?.('Selesai');
              onOpenRequests();
            }}
            className="w-full flex items-center justify-between hover:bg-[#11294a] px-1.5 py-0.5 rounded transition-colors cursor-pointer group"
          >
            <span className="flex items-center gap-2 text-slate-200 group-hover:text-white">
              <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e] shadow-[0_0_6px_#22c55e]" />
              Selesai
            </span>
            <span className="font-semibold text-white">{selesaiPct}</span>
          </button>

          {/* Row Proses */}
          <button
            type="button"
            onClick={() => {
              onFilterStatus?.('Proses');
              onOpenRequests();
            }}
            className="w-full flex items-center justify-between hover:bg-[#11294a] px-1.5 py-0.5 rounded transition-colors cursor-pointer group"
          >
            <span className="flex items-center gap-2 text-slate-200 group-hover:text-white">
              <span className="w-2.5 h-2.5 rounded-full bg-[#eab308] shadow-[0_0_6px_#eab308]" />
              Proses
            </span>
            <span className="font-semibold text-white">{prosesPct}</span>
          </button>

          {/* Row Tertunda */}
          <button
            type="button"
            onClick={() => {
              onFilterStatus?.('Tertunda');
              onOpenRequests();
            }}
            className="w-full flex items-center justify-between hover:bg-[#11294a] px-1.5 py-0.5 rounded transition-colors cursor-pointer group"
          >
            <span className="flex items-center gap-2 text-slate-200 group-hover:text-white">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444] shadow-[0_0_6px_#ef4444]" />
              Tertunda
            </span>
            <span className="font-semibold text-white">{tertundaPct}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
