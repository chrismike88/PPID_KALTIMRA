import { X, Building, CheckCircle, Clock, FileText } from 'lucide-react';
import { UnitStat } from '../types';

interface RegionDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  unit: UnitStat | null;
  onViewUnitTickets: (unitName: string) => void;
}

export default function RegionDetailModal({
  isOpen,
  onClose,
  unit,
  onViewUnitTickets,
}: RegionDetailModalProps) {
  if (!isOpen || !unit) return null;

  return (
    <div
      id="modal-region-detail-backdrop"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="region-detail-title"
    >
      <div
        id="modal-region-detail-container"
        className="bg-[#08172c] border border-[#1a3d6b] rounded-2xl w-full max-w-md shadow-2xl flex flex-col overflow-hidden text-slate-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#143257] bg-[#0a1e38]">
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-sky-400" />
            <h3 id="region-detail-title" className="text-base font-bold text-white">
              {unit.name}
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

        {/* Body */}
        <div className="p-5 space-y-4 text-xs">
          <div className="flex items-center justify-between bg-[#0a1e38] p-3 rounded-xl border border-[#143257]">
            <span className="text-slate-300 font-medium">Klasifikasi Beban Layanan:</span>
            <span
              className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                unit.level === 'Tinggi'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
              }`}
            >
              {unit.level}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2.5 text-center">
            <div className="bg-[#091b33] p-3 rounded-xl border border-[#163761]">
              <span className="text-[10px] text-slate-400 block mb-1">Total Permohonan</span>
              <span className="text-xl font-bold text-amber-400 font-mono">{unit.count}</span>
            </div>
            <div className="bg-[#091b33] p-3 rounded-xl border border-[#163761]">
              <span className="text-[10px] text-slate-400 block mb-1">Pencapaian SLA</span>
              <span className="text-xl font-bold text-emerald-400 font-mono">{unit.slaPercent}%</span>
            </div>
            <div className="bg-[#091b33] p-3 rounded-xl border border-[#163761]">
              <span className="text-[10px] text-slate-400 block mb-1">Rata-rata Waktu</span>
              <span className="text-xl font-bold text-white font-mono">{unit.avgDays} Hari</span>
            </div>
          </div>

          <div className="bg-[#0a1e38] p-3.5 rounded-xl border border-[#143257] space-y-2">
            <h4 className="font-bold text-white flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              Komitmen Layanan Unit
            </h4>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Unit {unit.name} mengampu pelayanan keterbukaan informasi di wilayah kerja {unit.region}. Dilengkapi PIC Information Owner khusus lintas bidang untuk memastikan respons smart reminder tepat waktu.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#143257] bg-[#0a1e38] flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              onClose();
              onViewUnitTickets(unit.name);
            }}
            className="w-full px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-white font-bold cursor-pointer transition-colors text-xs flex items-center justify-center gap-2"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Lihat Daftar Kasus {unit.name}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
