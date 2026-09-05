import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import MetricCards from './components/MetricCards';
import MapDistribution from './components/MapDistribution';
import CategoryDonutChart from './components/CategoryDonutChart';
import TopUnitsBarChart from './components/TopUnitsBarChart';
import TrendLineChart from './components/TrendLineChart';
import QuickAccessButtons from './components/QuickAccessButtons';
import PermohonanModal from './components/PermohonanModal';
import LaporanKinerjaModal from './components/LaporanKinerjaModal';
import SettingsModal from './components/SettingsModal';
import AccessibleTableModal from './components/AccessibleTableModal';
import RegionDetailModal from './components/RegionDetailModal';
import { INITIAL_METRICS, SAMPLE_TICKETS, TOP_UNITS } from './data/mockData';
import { DashboardMetrics, ServiceStatus, Ticket, UnitStat, UserRoleConfig } from './types';

export default function App() {
  const [metrics, setMetrics] = useState<DashboardMetrics>(INITIAL_METRICS);
  const [tickets, setTickets] = useState<Ticket[]>(SAMPLE_TICKETS);

  // Modals state
  const [isPermohonanOpen, setIsPermohonanOpen] = useState(false);
  const [isLaporanOpen, setIsLaporanOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAccessibleTableOpen, setIsAccessibleTableOpen] = useState(false);
  const [selectedUnitForModal, setSelectedUnitForModal] = useState<UnitStat | null>(null);
  const [statusFilterForModal, setStatusFilterForModal] = useState<ServiceStatus | 'Semua'>('Semua');

  // Preferences
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isLive, setIsLive] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(60);
  const [currentRole, setCurrentRole] = useState<UserRoleConfig>({
    role: 'Manager Komunikasi',
    name: 'Manager Bidang Komunikasi',
    email: 'manager.komunikasi@pln-kaltimra.co.id',
  });

  // Calculate pending count
  const pendingCount = tickets.filter((t) => t.status !== 'Selesai').length;

  // Add new ticket handler
  const handleAddTicket = (newTicket: Ticket) => {
    setTickets((prev) => [newTicket, ...prev]);
    setMetrics((prev) => {
      const newTotal = prev.totalRequests + 1;
      const newProsesCount = prev.statusBreakdown.proses.count + 1;
      return {
        ...prev,
        totalRequests: newTotal,
        statusBreakdown: {
          ...prev.statusBreakdown,
          proses: {
            count: newProsesCount,
            percentage: Number(((newProsesCount / newTotal) * 100).toFixed(1)),
          },
          selesai: {
            ...prev.statusBreakdown.selesai,
            percentage: Number(((prev.statusBreakdown.selesai.count / newTotal) * 100).toFixed(1)),
          },
          tertunda: {
            ...prev.statusBreakdown.tertunda,
            percentage: Number(((prev.statusBreakdown.tertunda.count / newTotal) * 100).toFixed(1)),
          },
        },
      };
    });
  };

  // Update ticket status handler
  const handleUpdateTicketStatus = (ticketId: string, newStatus: ServiceStatus) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status: newStatus } : t))
    );

    if (newStatus === 'Selesai') {
      setMetrics((prev) => {
        const newSelesai = prev.statusBreakdown.selesai.count + 1;
        const newProses = Math.max(0, prev.statusBreakdown.proses.count - 1);
        return {
          ...prev,
          statusBreakdown: {
            ...prev.statusBreakdown,
            selesai: {
              count: newSelesai,
              percentage: Number(((newSelesai / prev.totalRequests) * 100).toFixed(1)),
            },
            proses: {
              count: newProses,
              percentage: Number(((newProses / prev.totalRequests) * 100).toFixed(1)),
            },
          },
        };
      });
    }
  };

  // Audio Assist: Indonesian TTS synthesis
  const speakDashboardSummary = useCallback(() => {
    if (!('speechSynthesis' in window)) {
      alert('Fitur Text-to-Speech tidak didukung oleh peramban ini.');
      return;
    }

    if (isAudioPlaying) {
      window.speechSynthesis.cancel();
      setIsAudioPlaying(false);
      return;
    }

    window.speechSynthesis.cancel();
    const text = `Dashboard Pe-P-I-D Unit Induk Distribusi Kaltimra. Total seribu dua ratus lima puluh tujuh permohonan. Tingkat pencapaian S-L-A sembilan puluh delapan koma enam persen. Rata-rata waktu penyelesaian satu koma delapan puluh dua hari. Tiga puluh tujuh unit pelaksana aktif. Status layanan: selesai sembilan puluh delapan koma enam persen, dalam proses satu koma dua persen, dan tertunda nol koma dua persen.`;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID';
    utterance.rate = 1.0;
    utterance.onend = () => setIsAudioPlaying(false);
    utterance.onerror = () => setIsAudioPlaying(false);

    setIsAudioPlaying(true);
    window.speechSynthesis.speak(utterance);
  }, [isAudioPlaying]);

  // Clean speech synthesis on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Periodic simulated data refresh
  const handleRefreshData = () => {
    // Subtle flash / reassurance
    const notification = document.createElement('div');
    notification.innerText = '✓ Snapshot data PPID berhasil diperbarui.';
    notification.className =
      'fixed bottom-5 right-5 z-50 bg-[#0c2344] text-sky-300 border border-sky-400/40 px-4 py-2 rounded-xl shadow-2xl text-xs font-semibold';
    document.body.appendChild(notification);
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 2500);
  };

  const handleOpenRequestsWithFilter = (filter: ServiceStatus | 'Semua' = 'Semua') => {
    setStatusFilterForModal(filter);
    setIsPermohonanOpen(true);
  };

  const handleSelectUnitFromChart = (unitName: string) => {
    const found = TOP_UNITS.find((u) => u.name === unitName);
    if (found) {
      setSelectedUnitForModal(found);
    }
  };

  const handleSelectRegionFromMap = (region: any) => {
    const found = TOP_UNITS.find((u) => u.name.includes(region.unit) || region.unit.includes(u.name));
    if (found) {
      setSelectedUnitForModal(found);
    } else {
      setSelectedUnitForModal({
        name: region.unit,
        code: region.id,
        region: region.name,
        count: region.count,
        slaPercent: region.sla,
        avgDays: 1.8,
        level: region.level,
      });
    }
  };

  return (
    <div
      id="dashboard-root"
      className={`min-h-screen transition-colors duration-300 ${
        isHighContrast
          ? 'bg-black text-white'
          : 'bg-[#050e1d] text-slate-100 selection:bg-sky-500 selection:text-white'
      } font-sans`}
      style={{
        backgroundImage: isHighContrast
          ? 'none'
          : 'radial-gradient(circle at 50% 0%, #0c203b 0%, #050e1d 60%, #020710 100%)',
      }}
    >
      {/* Main Container */}
      <main className="max-w-[1440px] mx-auto p-3 sm:p-4 md:p-5 lg:p-6 space-y-4">
        {/* Header Component */}
        <Header
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenAccessibleTable={() => setIsAccessibleTableOpen(true)}
          isAudioPlaying={isAudioPlaying}
          onToggleAudio={speakDashboardSummary}
          isLive={isLive}
          onToggleLive={() => setIsLive(!isLive)}
          onRefreshData={handleRefreshData}
        />

        {/* Top Metric Cards Row (Permohonan, SLA, Rata-rata Hari, Unit Aktif, Status Layanan) */}
        <MetricCards
          metrics={metrics}
          onFilterStatus={handleOpenRequestsWithFilter}
          onOpenRequests={() => handleOpenRequestsWithFilter('Semua')}
        />

        {/* Main Content 3-Column Grid matching Screenshot exactly */}
        <section
          id="section-dashboard-charts"
          aria-label="Grafik dan Sebaran Pelayanan"
          className="grid grid-cols-1 md:grid-cols-12 gap-3.5"
        >
          {/* Column 1 (Left): Sebaran Permohonan Per Unit (Map) */}
          <div className="md:col-span-4 flex flex-col">
            <MapDistribution onSelectRegion={handleSelectRegionFromMap} />
          </div>

          {/* Column 2 (Center): Jenis Permohonan (Donut) & Top Unit (Bars) */}
          <div className="md:col-span-4 flex flex-col gap-3.5">
            <div className="flex-1 min-h-[190px]">
              <CategoryDonutChart
                onSelectCategory={(cat) => {
                  handleOpenRequestsWithFilter('Semua');
                }}
              />
            </div>
            <div className="flex-1 min-h-[220px]">
              <TopUnitsBarChart onSelectUnit={handleSelectUnitFromChart} />
            </div>
          </div>

          {/* Column 3 (Right): Tren Permohonan (Line Chart) & Akses Cepat (Quick Access) */}
          <div className="md:col-span-4 flex flex-col gap-3.5">
            <div className="flex-1 min-h-[190px]">
              <TrendLineChart />
            </div>
            <div className="flex-1 min-h-[220px]">
              <QuickAccessButtons
                onOpenRequests={() => handleOpenRequestsWithFilter('Semua')}
                onOpenReports={() => setIsLaporanOpen(true)}
                pendingCount={pendingCount}
              />
            </div>
          </div>
        </section>
      </main>

      {/* Modals & Drawers */}
      <PermohonanModal
        isOpen={isPermohonanOpen}
        onClose={() => setIsPermohonanOpen(false)}
        tickets={tickets}
        onAddTicket={handleAddTicket}
        onUpdateTicketStatus={handleUpdateTicketStatus}
        initialStatusFilter={statusFilterForModal}
      />

      <LaporanKinerjaModal
        isOpen={isLaporanOpen}
        onClose={() => setIsLaporanOpen(false)}
        metrics={metrics}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        isHighContrast={isHighContrast}
        onToggleHighContrast={() => setIsHighContrast(!isHighContrast)}
        currentRole={currentRole}
        onChangeRole={(r) =>
          setCurrentRole((prev) => ({
            ...prev,
            role: r,
            name: `${r} UID Kaltimra`,
          }))
        }
        refreshInterval={refreshInterval}
        onChangeRefreshInterval={setRefreshInterval}
        onTestAudioSpeech={speakDashboardSummary}
      />

      <AccessibleTableModal
        isOpen={isAccessibleTableOpen}
        onClose={() => setIsAccessibleTableOpen(false)}
        metrics={metrics}
      />

      <RegionDetailModal
        isOpen={Boolean(selectedUnitForModal)}
        onClose={() => setSelectedUnitForModal(null)}
        unit={selectedUnitForModal}
        onViewUnitTickets={(unitName) => {
          handleOpenRequestsWithFilter('Semua');
        }}
      />
    </div>
  );
}
