import { useState } from 'react';
import {
  X,
  Volume2,
  Sliders,
  Shield,
  Clock,
  Sparkles,
  Info,
} from 'lucide-react';
import { UserRoleConfig } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isHighContrast: boolean;
  onToggleHighContrast: () => void;
  currentRole: UserRoleConfig;
  onChangeRole: (newRole: UserRoleConfig['role']) => void;
  refreshInterval: number;
  onChangeRefreshInterval: (seconds: number) => void;
  onTestAudioSpeech: () => void;
}

export default function SettingsModal({
  isOpen,
  onClose,
  isHighContrast,
  onToggleHighContrast,
  currentRole,
  onChangeRole,
  refreshInterval,
  onChangeRefreshInterval,
  onTestAudioSpeech,
}: SettingsModalProps) {
  if (!isOpen) return null;

  return (
    <div
      id="modal-settings-backdrop"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-modal-title"
    >
      <div
        id="modal-settings-container"
        className="bg-[#08172c] border border-[#1a3d6b] rounded-2xl w-full max-w-lg shadow-2xl flex flex-col overflow-hidden text-slate-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#143257] bg-[#0a1e38]">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-sky-400" />
            <h3 id="settings-modal-title" className="text-base font-bold text-white">
              Pengaturan & Aksesibilitas KOEI
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
        <div className="p-5 space-y-4 text-xs">
          {/* Section 1: Accessibility & Contrast */}
          <div className="bg-[#0a1e38] p-3.5 rounded-xl border border-[#143257] space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Mode Kontras Tinggi (High Contrast)
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Optimasi kontras WCAG 2.2 AA untuk kemudahan penglihatan
                </p>
              </div>
              <button
                type="button"
                onClick={onToggleHighContrast}
                className={`w-11 h-6 rounded-full p-1 transition-colors cursor-pointer ${
                  isHighContrast ? 'bg-sky-500' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    isHighContrast ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="border-t border-[#143257] pt-2.5 flex items-center justify-between">
              <div>
                <div className="font-bold text-white flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-sky-400" />
                  Audio Assist Narration (TTS)
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Narasi suara ringkasan dashboard K-OIE dalam Bahasa Indonesia
                </p>
              </div>
              <button
                type="button"
                onClick={onTestAudioSpeech}
                className="px-2.5 py-1 rounded bg-sky-500/20 text-sky-300 hover:bg-sky-500/30 border border-sky-400/30 font-semibold cursor-pointer"
              >
                Uji Suara
              </button>
            </div>
          </div>

          {/* Section 2: Role Switcher */}
          <div className="bg-[#0a1e38] p-3.5 rounded-xl border border-[#143257] space-y-2">
            <label className="font-bold text-white flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-sky-400" />
              Simulasi Peran Pengguna (RACI PPID)
            </label>
            <p className="text-[11px] text-slate-400">
              Ubah perspektif pengguna untuk melihat filter dan hak akses alur kerja:
            </p>
            <select
              value={currentRole.role}
              onChange={(e) => onChangeRole(e.target.value as any)}
              className="w-full px-3 py-2 rounded-lg bg-[#0c2242] border border-[#1b3d6a] text-xs text-white focus:outline-none focus:border-sky-400"
            >
              <option value="Manager Komunikasi">Manager Bidang Komunikasi (Product Owner & Evaluator)</option>
              <option value="Pengelola Informasi">Pengelola Informasi (Admin Permohonan & Verifikator)</option>
              <option value="Information Owner">Information Owner (PIC Unit Pelaksana & Sumber Data)</option>
              <option value="Auditor PPID">Auditor PPID (Pemeriksa Kepatuhan SLA Read-Only)</option>
            </select>
          </div>

          {/* Section 3: Data Cadence */}
          <div className="bg-[#0a1e38] p-3.5 rounded-xl border border-[#143257] space-y-2">
            <label className="font-bold text-white flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              Interval Pembaruan Data Snapshot
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[15, 60, 120].map((sec) => (
                <button
                  key={sec}
                  type="button"
                  onClick={() => onChangeRefreshInterval(sec)}
                  className={`p-2 rounded-lg text-center font-semibold cursor-pointer transition-colors ${
                    refreshInterval === sec
                      ? 'bg-sky-500/20 text-sky-300 border border-sky-400/40'
                      : 'bg-[#0c2242] text-slate-400 hover:text-white border border-[#143257]'
                  }`}
                >
                  {sec} Detik
                </button>
              ))}
            </div>
          </div>

          {/* Section 4: System Governance Info */}
          <div className="p-3 rounded-xl bg-[#051224] border border-[#143257] text-[11px] text-slate-400 space-y-1">
            <div className="font-semibold text-slate-300 flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-sky-400" /> Tata Kelola K-OIE UID Kaltimra:
            </div>
            <p>
              Mengacu pada UU No. 14/2008 & Perki No. 1/2021. Standar SLA: 10 Hari Kalender, perpanjangan maksimal 7 Hari Kalender, dan pengingat bertahap H-10, H-7, H-4, H-2, H+1.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#143257] bg-[#0a1e38] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-white font-bold cursor-pointer transition-colors text-xs"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
}
