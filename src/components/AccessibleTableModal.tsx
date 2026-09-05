import { X, Table } from 'lucide-react';
import { CATEGORY_STATS, MONTHLY_TRENDS, TOP_UNITS, ALL_REGIONS_MAP_DATA } from '../data/mockData';
import { DashboardMetrics } from '../types';

interface AccessibleTableModalProps {
  isOpen: boolean;
  onClose: () => void;
  metrics: DashboardMetrics;
}

export default function AccessibleTableModal({
  isOpen,
  onClose,
  metrics,
}: AccessibleTableModalProps) {
  if (!isOpen) return null;

  return (
    <div
      id="modal-accessible-table-backdrop"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="accessible-table-title"
    >
      <div
        id="modal-accessible-table-container"
        className="bg-[#08172c] border border-[#1a3d6b] rounded-2xl w-full max-w-4xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden text-slate-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#143257] bg-[#0a1e38]">
          <div className="flex items-center gap-2">
            <Table className="w-4 h-4 text-sky-400" />
            <h3 id="accessible-table-title" className="text-base font-bold text-white">
              Tabel Data Alternatif Aksesibel (Mode Ramah Pembaca Layar)
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#0c2242] hover:bg-[#143666] text-slate-400 hover:text-white border border-[#1a3d6b] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-6 text-xs flex-1">
          {/* Table 1: Ringkasan Metrik Utama */}
          <div>
            <h4 className="font-bold text-white mb-2 text-sm">
              1. Ringkasan Kinerja Utama Layanan Informasi
            </h4>
            <div className="overflow-x-auto border border-[#143257] rounded-lg">
              <table className="w-full text-left">
                <thead className="bg-[#0a1e38] text-slate-300 border-b border-[#143257]">
                  <tr>
                    <th className="p-2.5">Indikator</th>
                    <th className="p-2.5 text-right">Nilai Aktual</th>
                    <th className="p-2.5 text-left">Keterangan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#102a4d]">
                  <tr>
                    <td className="p-2.5 font-semibold text-white">Total Permohonan</td>
                    <td className="p-2.5 text-right font-mono font-bold text-amber-400">
                      {metrics.totalRequests.toLocaleString('id-ID')}
                    </td>
                    <td className="p-2.5 text-slate-300">Akumulasi seluruh permohonan masuk tahun berjalan</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-white">Pencapaian SLA</td>
                    <td className="p-2.5 text-right font-mono font-bold text-emerald-400">
                      {metrics.slaAchievement}%
                    </td>
                    <td className="p-2.5 text-slate-300">Target minimal korporat 95%</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-white">Rata-rata Waktu Layanan</td>
                    <td className="p-2.5 text-right font-mono font-bold text-amber-400">
                      {metrics.averageDays} Hari
                    </td>
                    <td className="p-2.5 text-slate-300">Durasi kalender dari masuk hingga jawaban terkirim</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-white">Unit Aktif Terpantau</td>
                    <td className="p-2.5 text-right font-mono font-bold text-white">
                      {metrics.activeUnits} Unit
                    </td>
                    <td className="p-2.5 text-slate-300">6 UP3 + 31 ULP/Sub-unit pelayanan</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-white">Status Selesai</td>
                    <td className="p-2.5 text-right font-mono font-bold text-emerald-400">
                      {metrics.statusBreakdown.selesai.percentage}% ({metrics.statusBreakdown.selesai.count} tiket)
                    </td>
                    <td className="p-2.5 text-slate-300">Telah terpenuhi dan tersampaikan</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-white">Status Dalam Proses</td>
                    <td className="p-2.5 text-right font-mono font-bold text-amber-400">
                      {metrics.statusBreakdown.proses.percentage}% ({metrics.statusBreakdown.proses.count} tiket)
                    </td>
                    <td className="p-2.5 text-slate-300">Dalam tahap verifikasi atau pengumpulan dokumen</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-white">Status Tertunda / Overdue</td>
                    <td className="p-2.5 text-right font-mono font-bold text-rose-400">
                      {metrics.statusBreakdown.tertunda.percentage}% ({metrics.statusBreakdown.tertunda.count} tiket)
                    </td>
                    <td className="p-2.5 text-slate-300">Dalam tahap eskalasi pimpinan / pertimbangan khusus</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Table 2: Jenis Permohonan */}
          <div>
            <h4 className="font-bold text-white mb-2 text-sm">
              2. Data Jenis / Kategori Permohonan
            </h4>
            <div className="overflow-x-auto border border-[#143257] rounded-lg">
              <table className="w-full text-left">
                <thead className="bg-[#0a1e38] text-slate-300 border-b border-[#143257]">
                  <tr>
                    <th className="p-2.5">Kategori</th>
                    <th className="p-2.5 text-right">Persentase</th>
                    <th className="p-2.5 text-right">Jumlah Kasus</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#102a4d]">
                  {CATEGORY_STATS.map((c) => (
                    <tr key={c.category}>
                      <td className="p-2.5 font-semibold text-white">{c.category}</td>
                      <td className="p-2.5 text-right font-mono text-sky-300">{c.percentage}%</td>
                      <td className="p-2.5 text-right font-mono text-white">{c.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Table 3: Data Wilayah & Top Units */}
          <div>
            <h4 className="font-bold text-white mb-2 text-sm">
              3. Data Sebaran Wilayah Kerja Unit Pelaksana
            </h4>
            <div className="overflow-x-auto border border-[#143257] rounded-lg">
              <table className="w-full text-left">
                <thead className="bg-[#0a1e38] text-slate-300 border-b border-[#143257]">
                  <tr>
                    <th className="p-2.5">Wilayah / Unit</th>
                    <th className="p-2.5 text-center">Tingkat Beban</th>
                    <th className="p-2.5 text-right">Jumlah Permohonan</th>
                    <th className="p-2.5 text-right">SLA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#102a4d]">
                  {ALL_REGIONS_MAP_DATA.map((r) => (
                    <tr key={r.id}>
                      <td className="p-2.5 font-semibold text-white">{r.name}</td>
                      <td className="p-2.5 text-center">
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                            r.level === 'Tinggi'
                              ? 'bg-amber-500/20 text-amber-300'
                              : r.level === 'Sedang'
                              ? 'bg-sky-500/20 text-sky-300'
                              : 'bg-slate-700 text-slate-300'
                          }`}
                        >
                          {r.level}
                        </span>
                      </td>
                      <td className="p-2.5 text-right font-mono text-white">{r.count}</td>
                      <td className="p-2.5 text-right font-mono text-emerald-400">{r.sla}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
