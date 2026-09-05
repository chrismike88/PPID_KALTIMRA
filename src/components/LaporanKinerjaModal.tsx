import { useState } from 'react';
import {
  X,
  Download,
  Printer,
  Award,
  BarChart3,
  CheckCircle,
  FileSpreadsheet,
  TrendingUp,
} from 'lucide-react';
import { TOP_UNITS } from '../data/mockData';
import { DashboardMetrics } from '../types';

interface LaporanKinerjaModalProps {
  isOpen: boolean;
  onClose: () => void;
  metrics: DashboardMetrics;
}

export default function LaporanKinerjaModal({
  isOpen,
  onClose,
  metrics,
}: LaporanKinerjaModalProps) {
  const [period, setPeriod] = useState<'2026 YTD' | 'Semester I 2026' | 'Triwulan III 2026'>('2026 YTD');

  if (!isOpen) return null;

  const handleExportCSV = () => {
    const headers = ['Unit UP3', 'Kode', 'Total Permohonan', 'Pencapaian SLA (%)', 'Rata-rata Hari', 'Kategori Kinerja'];
    const rows = TOP_UNITS.map((u) => [
      u.name,
      u.code,
      u.count,
      `${u.slaPercent}%`,
      `${u.avgDays} hari`,
      u.level,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Laporan_Kinerja_PPID_UID_Kaltimra_${period.replace(/ /g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      id="modal-laporan-backdrop"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="laporan-modal-title"
    >
      <div
        id="modal-laporan-container"
        className="bg-[#08172c] border border-[#1a3d6b] rounded-2xl w-full max-w-4xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden text-slate-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#143257] bg-[#0a1e38]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-400">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div>
              <h3 id="laporan-modal-title" className="text-base sm:text-lg font-bold text-white leading-tight">
                Laporan Kinerja & Akuntabilitas PPID
              </h3>
              <p className="text-xs text-sky-300/80">
                Ringkasan Evaluasi Pelayanan Keterbukaan Informasi • UID Kaltimra
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-export-csv"
              type="button"
              onClick={handleExportCSV}
              className="px-3 py-1.5 rounded-lg bg-[#0c2242] hover:bg-[#133766] border border-[#1b3d6a] text-xs font-semibold text-sky-300 flex items-center gap-1.5 cursor-pointer transition-all"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              id="btn-print-laporan"
              type="button"
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white text-xs font-semibold flex items-center gap-1.5 shadow cursor-pointer transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-[#0c2242] hover:bg-[#143666] text-slate-400 hover:text-white border border-[#1a3d6b] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1">
          {/* Period Selector */}
          <div className="flex items-center justify-between bg-[#0a1e38] p-3 rounded-xl border border-[#143257]">
            <div className="text-xs text-slate-300 font-medium">
              Periode Evaluasi Terpilih: <strong className="text-white">{period}</strong>
            </div>
            <div className="flex items-center gap-1 text-xs">
              {(['2026 YTD', 'Semester I 2026', 'Triwulan III 2026'] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPeriod(p)}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    period === p
                      ? 'bg-sky-500/20 text-sky-300 font-semibold border border-sky-400/30'
                      : 'text-slate-400 hover:text-white hover:bg-[#0c2242]'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* 4 Scorecards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Card 1: SLA */}
            <div className="bg-[#091b33] p-3.5 rounded-xl border border-[#163761]">
              <div className="text-[11px] text-slate-400 font-medium">Pencapaian SLA</div>
              <div className="text-2xl font-bold text-amber-400 mt-1">98,6%</div>
              <div className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> Melampaui target (95%)
              </div>
            </div>

            {/* Card 2: Durasi */}
            <div className="bg-[#091b33] p-3.5 rounded-xl border border-[#163761]">
              <div className="text-[11px] text-slate-400 font-medium">Rata-rata Waktu</div>
              <div className="text-2xl font-bold text-amber-400 mt-1">1,82 Hari</div>
              <div className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> Target Proyeksi: 7 Hari
              </div>
            </div>

            {/* Card 3: IKIP */}
            <div className="bg-[#091b33] p-3.5 rounded-xl border border-[#163761]">
              <div className="text-[11px] text-slate-400 font-medium">Indeks IKIP Proyeksi</div>
              <div className="text-2xl font-bold text-white mt-1">92,4</div>
              <div className="text-[10px] text-sky-400 mt-1 flex items-center gap-1">
                <Award className="w-3 h-3" /> Kategori: Informatif
              </div>
            </div>

            {/* Card 4: SKM */}
            <div className="bg-[#091b33] p-3.5 rounded-xl border border-[#163761]">
              <div className="text-[11px] text-slate-400 font-medium">Survei Kepuasan (SKM)</div>
              <div className="text-2xl font-bold text-white mt-1">91,8 / 100</div>
              <div className="text-[10px] text-emerald-400 mt-1">
                Predikat: Sangat Puas
              </div>
            </div>
          </div>

          {/* Unit Performance Benchmarking Table */}
          <div className="bg-[#091b33] rounded-xl border border-[#163761] overflow-hidden">
            <div className="px-4 py-3 border-b border-[#143257] flex items-center justify-between">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Peringkat & Kinerja Pelayanan Unit Pelaksana (UP3)
              </h4>
              <span className="text-[11px] text-slate-400">Total: 37 Unit Terpantau</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#07162b] text-slate-300 font-semibold border-b border-[#143257]">
                  <tr>
                    <th className="p-3">Nama Unit Pelaksana</th>
                    <th className="p-3 text-right">Permohonan</th>
                    <th className="p-3 text-right">SLA Tercapai</th>
                    <th className="p-3 text-right">Rata-rata Hari</th>
                    <th className="p-3 text-center">Status Beban</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#102a4d]">
                  {TOP_UNITS.map((unit) => (
                    <tr key={unit.name} className="hover:bg-[#0c2242] transition-colors">
                      <td className="p-3 font-semibold text-white flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                        {unit.name}
                      </td>
                      <td className="p-3 text-right font-mono font-bold text-white">
                        {unit.count}
                      </td>
                      <td className="p-3 text-right font-mono text-emerald-400 font-semibold">
                        {unit.slaPercent}%
                      </td>
                      <td className="p-3 text-right font-mono text-slate-300">
                        {unit.avgDays} hari
                      </td>
                      <td className="p-3 text-center">
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                            unit.level === 'Tinggi'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                          }`}
                        >
                          {unit.level}
                        </span>
                      </td>
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
