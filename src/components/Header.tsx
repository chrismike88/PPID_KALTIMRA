import { useEffect, useState } from 'react';
import { Volume2, VolumeX, Settings, RefreshCw, Eye } from 'lucide-react';

interface HeaderProps {
  onOpenSettings: () => void;
  onOpenAccessibleTable: () => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
  isLive: boolean;
  onToggleLive: () => void;
  onRefreshData: () => void;
}

export default function Header({
  onOpenSettings,
  onOpenAccessibleTable,
  isAudioPlaying,
  onToggleAudio,
  isLive,
  onToggleLive,
  onRefreshData,
}: HeaderProps) {
  const [timeStr, setTimeStr] = useState('10:30:45');

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      setTimeStr(`${h}:${m}:${s}`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header
      id="dashboard-header"
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-[#143257]/60"
    >
      {/* Title & Brand Context */}
      <div>
        <div className="flex items-center gap-3">
          <h1
            id="dashboard-main-title"
            className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-wide uppercase drop-shadow-sm font-sans"
          >
            DASHBOARD PPID UID KALTIMRA
          </h1>
        </div>
        <p className="text-xs text-sky-400/80 font-medium tracking-wide mt-0.5">
          K-OIE (Kaltimra Open Info Ecosystem) • PLN UID Kalimantan Timur & Kalimantan Utara
        </p>
      </div>

      {/* Right Controls: Live status, Clock, Accessibility, Refresh & Settings */}
      <div className="flex items-center gap-2 self-end sm:self-center flex-wrap">
        {/* Audio Assist Narration Toggle */}
        <button
          id="btn-audio-assist"
          type="button"
          onClick={onToggleAudio}
          className={`px-2.5 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer border ${
            isAudioPlaying
              ? 'bg-sky-500/20 text-sky-300 border-sky-400/40 shadow-sm shadow-sky-500/30'
              : 'bg-[#0b1c36] hover:bg-[#112a52] text-slate-300 border-[#1a3d6b]'
          }`}
          title="Audio Assist (Bacakan ringkasan dashboard dalam Bahasa Indonesia)"
          aria-label="Audio Assist K-OIE"
        >
          {isAudioPlaying ? <Volume2 className="w-3.5 h-3.5 text-sky-400 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5 text-slate-400" />}
          <span className="hidden md:inline">Audio</span>
        </button>

        {/* Accessible Data View Toggle */}
        <button
          id="btn-accessible-table"
          type="button"
          onClick={onOpenAccessibleTable}
          className="px-2.5 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 bg-[#0b1c36] hover:bg-[#112a52] text-slate-300 border border-[#1a3d6b] transition-all cursor-pointer"
          title="Tabel Aksesibel (Mode Ramah Pembaca Layar)"
          aria-label="Buka tabel alternatif"
        >
          <Eye className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden md:inline">Tabel</span>
        </button>

        {/* Manual Refresh */}
        <button
          id="btn-refresh-data"
          type="button"
          onClick={onRefreshData}
          className="p-1.5 rounded-full bg-[#0b1c36] hover:bg-[#112a52] text-slate-300 border border-[#1a3d6b] transition-all cursor-pointer"
          title="Segarkan data snapshot"
          aria-label="Segarkan data"
        >
          <RefreshCw className="w-3.5 h-3.5 text-slate-400 hover:text-sky-300" />
        </button>

        {/* LIVE Indicator Pill */}
        <button
          id="badge-live-indicator"
          type="button"
          onClick={onToggleLive}
          className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider flex items-center gap-1.5 transition-all cursor-pointer border ${
            isLive
              ? 'bg-[#290d13] text-[#ef4444] border-[#7f1d1d]/60 shadow-[0_0_12px_rgba(239,68,68,0.25)]'
              : 'bg-slate-800/80 text-slate-400 border-slate-700'
          }`}
          title={isLive ? 'Status Real-Time AKTIF (Snapshot 60 detik)' : 'Status Real-Time Dijeda'}
        >
          <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-[#ef4444] animate-ping' : 'bg-slate-500'}`} />
          <span>{isLive ? '• LIVE' : 'PAUSED'}</span>
        </button>

        {/* Digital Clock Box */}
        <div
          id="clock-display"
          className="px-3.5 py-1 rounded-full bg-[#0c1f38] border border-[#1a3d6b] text-white font-mono text-xs font-semibold tracking-wider shadow-inner"
        >
          {timeStr}
        </div>

        {/* Settings Gear Button */}
        <button
          id="btn-settings-toggle"
          type="button"
          onClick={onOpenSettings}
          className="p-1.5 rounded-full bg-[#0c1f38] hover:bg-[#14325c] text-slate-300 hover:text-white border border-[#1a3d6b] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-400"
          title="Pengaturan & Aksesibilitas"
          aria-label="Buka Pengaturan"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
