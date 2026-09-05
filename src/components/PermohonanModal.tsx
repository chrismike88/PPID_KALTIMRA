import { useState, FormEvent } from 'react';
import {
  X,
  Search,
  Plus,
  Clock,
  User,
  Building,
  FileCheck,
  AlertTriangle,
  CheckCircle2,
  Send,
  Calendar,
  Layers,
} from 'lucide-react';
import { RequestCategory, ServiceStatus, Ticket } from '../types';

interface PermohonanModalProps {
  isOpen: boolean;
  onClose: () => void;
  tickets: Ticket[];
  onAddTicket: (newTicket: Ticket) => void;
  onUpdateTicketStatus: (ticketId: string, newStatus: ServiceStatus) => void;
  initialStatusFilter?: ServiceStatus | 'Semua';
}

export default function PermohonanModal({
  isOpen,
  onClose,
  tickets,
  onAddTicket,
  onUpdateTicketStatus,
  initialStatusFilter = 'Semua',
}: PermohonanModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ServiceStatus | 'Semua'>(initialStatusFilter);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(tickets[0] || null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // New ticket form state
  const [newApplicant, setNewApplicant] = useState('');
  const [newCategory, setNewCategory] = useState<RequestCategory>('Informasi Publik');
  const [newUnit, setNewUnit] = useState('UP3 Balikpapan');
  const [newChannel, setNewChannel] = useState<'Web Portal' | 'Meja Layanan' | 'Surat Resmi' | 'Email PPID'>('Web Portal');
  const [newSubject, setNewSubject] = useState('');
  const [newDesc, setNewDesc] = useState('');

  if (!isOpen) return null;

  // Filter tickets
  const filteredTickets = tickets.filter((t) => {
    const matchesStatus = statusFilter === 'Semua' ? true : t.status === statusFilter;
    const matchesSearch =
      t.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.unit.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleCreateSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newApplicant || !newSubject) return;

    const nextIdNum = tickets.length + 902;
    const now = new Date();
    const dueDate = new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000);

    const created: Ticket = {
      id: `req-${Date.now()}`,
      ticketNumber: `PPID-2026-0${nextIdNum}`,
      applicantName: newApplicant,
      applicantCategory: 'Individu',
      receivedAt: now.toISOString().replace('T', ' ').substring(0, 16),
      dueAt: dueDate.toISOString().replace('T', ' ').substring(0, 16),
      channel: newChannel,
      subject: newSubject,
      description: newDesc || 'Permohonan informasi publik UID Kaltimra.',
      unit: newUnit,
      category: newCategory,
      status: 'Proses',
      slaStage: 'H-10 (Baru Masuk)',
      slaRemainingDays: 10,
      picName: 'PIC Pengelola Informasi',
      picDepartment: 'Bagian Komunikasi & TJSL',
      classification: 'Dalam Verifikasi',
      extensionApproved: false,
      documentCount: 1,
    };

    onAddTicket(created);
    setSelectedTicket(created);
    setIsCreatingNew(false);
    // Reset form
    setNewApplicant('');
    setNewSubject('');
    setNewDesc('');
  };

  return (
    <div
      id="modal-permohonan-backdrop"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="permohonan-modal-title"
    >
      <div
        id="modal-permohonan-container"
        className="bg-[#08172c] border border-[#1a3d6b] rounded-2xl w-full max-w-5xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden text-slate-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#143257] bg-[#0a1e38]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-400">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 id="permohonan-modal-title" className="text-base sm:text-lg font-bold text-white leading-tight">
                Pengelolaan Permohonan Informasi Publik (PPID)
              </h3>
              <p className="text-xs text-sky-300/80">
                Sistem Alur Kerja Terintegrasi K-OIE • UID Kaltimra
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-modal-new-ticket"
              type="button"
              onClick={() => setIsCreatingNew(true)}
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white text-xs font-semibold flex items-center gap-1.5 shadow cursor-pointer transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Catat Permohonan Baru</span>
            </button>

            <button
              id="btn-modal-close"
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-[#0c2242] hover:bg-[#143666] text-slate-400 hover:text-white border border-[#1a3d6b] transition-colors cursor-pointer"
              aria-label="Tutup modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left Column: List & Filter */}
          <div className="w-full md:w-5/12 border-r border-[#143257] flex flex-col bg-[#071529]">
            {/* Search & Tabs */}
            <div className="p-3 border-b border-[#143257] space-y-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="input-ticket-search"
                  type="text"
                  placeholder="Cari tiket, pemohon, judul..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#0a1e38] border border-[#1b3d6a] text-xs text-white placeholder-slate-400 focus:outline-none focus:border-sky-400"
                />
              </div>

              {/* Status Tabs */}
              <div className="flex items-center gap-1 overflow-x-auto text-[11px] pb-1">
                {(['Semua', 'Proses', 'Selesai', 'Tertunda'] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setStatusFilter(st)}
                    className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap cursor-pointer transition-colors ${
                      statusFilter === st
                        ? 'bg-sky-500/20 text-sky-300 border border-sky-400/30'
                        : 'text-slate-400 hover:text-white hover:bg-[#0c2242]'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Ticket List */}
            <div className="flex-1 overflow-y-auto divide-y divide-[#102a4d] max-h-[350px] md:max-h-none">
              {filteredTickets.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400">
                  Tidak ada permohonan yang sesuai filter.
                </div>
              ) : (
                filteredTickets.map((t) => {
                  const isSelected = selectedTicket?.id === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        setSelectedTicket(t);
                        setIsCreatingNew(false);
                      }}
                      className={`w-full text-left p-3 transition-colors cursor-pointer flex flex-col gap-1 ${
                        isSelected
                          ? 'bg-[#0f284c] border-l-4 border-sky-400'
                          : 'hover:bg-[#0c213d]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-sky-300">
                          {t.ticketNumber}
                        </span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                            t.status === 'Selesai'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : t.status === 'Proses'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          }`}
                        >
                          {t.status}
                        </span>
                      </div>

                      <div className="text-xs font-medium text-white line-clamp-1">
                        {t.subject}
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-400 mt-0.5">
                        <span className="truncate max-w-[140px]">{t.unit}</span>
                        <span className="font-mono text-[10px] text-amber-400/90">
                          {t.slaStage}
                        </span>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Column: Ticket Detail or Create Form */}
          <div className="w-full md:w-7/12 p-4 sm:p-5 overflow-y-auto bg-[#08182e] flex flex-col justify-between">
            {isCreatingNew ? (
              /* Create Ticket Form */
              <form onSubmit={handleCreateSubmit} className="space-y-3.5">
                <div className="flex items-center justify-between border-b border-[#143257] pb-2">
                  <h4 className="text-sm font-bold text-white">Catat Permohonan Informasi Baru</h4>
                  <button
                    type="button"
                    onClick={() => setIsCreatingNew(false)}
                    className="text-xs text-slate-400 hover:text-white cursor-pointer"
                  >
                    Batal
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-300 font-medium mb-1">
                      Nama Pemohon / Instansi *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Budi Santoso"
                      value={newApplicant}
                      onChange={(e) => setNewApplicant(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#0c2242] border border-[#1b3d6a] text-xs text-white focus:outline-none focus:border-sky-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 font-medium mb-1">
                      Kanal Masuk
                    </label>
                    <select
                      value={newChannel}
                      onChange={(e) => setNewChannel(e.target.value as any)}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#0c2242] border border-[#1b3d6a] text-xs text-white focus:outline-none focus:border-sky-400"
                    >
                      <option value="Web Portal">Web Portal PPID</option>
                      <option value="Meja Layanan">Meja Layanan (Langsung)</option>
                      <option value="Surat Resmi">Surat Resmi</option>
                      <option value="Email PPID">Email PPID</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-300 font-medium mb-1">
                      Kategori Permohonan
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#0c2242] border border-[#1b3d6a] text-xs text-white focus:outline-none focus:border-sky-400"
                    >
                      <option value="Informasi Publik">Informasi Publik</option>
                      <option value="Data & Dokumen">Data & Dokumen</option>
                      <option value="Layanan Publik">Layanan Publik</option>
                      <option value="Keuangan">Keuangan</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 font-medium mb-1">
                      Unit Pelaksana (UP3)
                    </label>
                    <select
                      value={newUnit}
                      onChange={(e) => setNewUnit(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#0c2242] border border-[#1b3d6a] text-xs text-white focus:outline-none focus:border-sky-400"
                    >
                      <option value="UP3 Balikpapan">UP3 Balikpapan</option>
                      <option value="UP3 Samarinda">UP3 Samarinda</option>
                      <option value="UP3 Bontang">UP3 Bontang</option>
                      <option value="UP3 Kaltara">UP3 Kaltara</option>
                      <option value="UP3 Berau">UP3 Berau</option>
                      <option value="UP3 Nusantara">UP3 Nusantara</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-300 font-medium mb-1">
                    Judul Permohonan Informasi *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ringkasan singkat informasi yang diminta"
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-[#0c2242] border border-[#1b3d6a] text-xs text-white focus:outline-none focus:border-sky-400"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-300 font-medium mb-1">
                    Rincian Kebutuhan & Tujuan Penggunaan
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Jelaskan kebutuhan dokumen, jangka waktu, dan tujuan penggunaan informasi..."
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-[#0c2242] border border-[#1b3d6a] text-xs text-white focus:outline-none focus:border-sky-400 resize-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsCreatingNew(false)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold shadow cursor-pointer transition-all"
                  >
                    Simpan & Mulai SLA 10 Hari
                  </button>
                </div>
              </form>
            ) : selectedTicket ? (
              /* Ticket Detail Pane */
              <div className="space-y-4">
                {/* Header Ticket Info */}
                <div className="border-b border-[#143257] pb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-sky-400 tracking-wider font-mono">
                      {selectedTicket.ticketNumber}
                    </span>
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                        selectedTicket.status === 'Selesai'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : selectedTicket.status === 'Proses'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      }`}
                    >
                      Status: {selectedTicket.status}
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-white mt-1">
                    {selectedTicket.subject}
                  </h4>
                </div>

                {/* SLA Stage Indicator matching PRD: H-10, H-7, H-4, H-2, H+1 */}
                <div className="bg-[#0b1e38] border border-[#163964] rounded-xl p-3">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-sky-400" />
                      Tahap SLA: <strong className="text-amber-300">{selectedTicket.slaStage}</strong>
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Batas Akhir: {selectedTicket.dueAt}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-[#051121] h-2 rounded-full overflow-hidden border border-[#143257]">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        selectedTicket.status === 'Selesai'
                          ? 'w-full bg-emerald-500'
                          : selectedTicket.slaRemainingDays <= 2
                          ? 'w-4/5 bg-rose-500'
                          : selectedTicket.slaRemainingDays <= 4
                          ? 'w-3/5 bg-amber-500'
                          : 'w-2/5 bg-sky-500'
                      }`}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                    <span>H-10 Mulai</span>
                    <span>H-7 Reminder</span>
                    <span>H-4 Warning</span>
                    <span>H-2 Critical</span>
                    <span>Selesai</span>
                  </div>
                </div>

                {/* Applicant & Assignment Grid */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-[#0a1e38] p-2.5 rounded-lg border border-[#143257]">
                    <span className="text-[11px] text-slate-400 flex items-center gap-1 mb-1">
                      <User className="w-3 h-3 text-sky-400" /> Pemohon & Kanal
                    </span>
                    <div className="font-semibold text-white">{selectedTicket.applicantName}</div>
                    <div className="text-[11px] text-slate-300">
                      {selectedTicket.applicantCategory} • {selectedTicket.channel}
                    </div>
                  </div>

                  <div className="bg-[#0a1e38] p-2.5 rounded-lg border border-[#143257]">
                    <span className="text-[11px] text-slate-400 flex items-center gap-1 mb-1">
                      <Building className="w-3 h-3 text-sky-400" /> Unit & PIC Ditugaskan
                    </span>
                    <div className="font-semibold text-white">{selectedTicket.unit}</div>
                    <div className="text-[11px] text-slate-300 truncate">
                      {selectedTicket.picName} ({selectedTicket.picDepartment})
                    </div>
                  </div>
                </div>

                {/* Description & Classification */}
                <div className="bg-[#0a1e38] p-3 rounded-lg border border-[#143257] space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-semibold">Uraian Permintaan:</span>
                    <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-sky-950 text-sky-300 border border-sky-800">
                      {selectedTicket.classification}
                    </span>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    {selectedTicket.description}
                  </p>
                </div>

                {/* Workflow Actions */}
                <div className="pt-2 border-t border-[#143257] flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {selectedTicket.status !== 'Selesai' ? (
                      <button
                        type="button"
                        onClick={() => onUpdateTicketStatus(selectedTicket.id, 'Selesai')}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow transition-all cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Selesaikan & Kirim Jawaban</span>
                      </button>
                    ) : (
                      <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Jawaban Terkirim & Terpenuhi
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => alert(`Pengingat Smart Reminder dikirim ke ${selectedTicket.picName}`)}
                      className="px-2.5 py-1.5 rounded-lg bg-[#0c2242] hover:bg-[#123159] text-sky-300 border border-[#1a3d6b] cursor-pointer"
                    >
                      Kirim Reminder PIC
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center text-xs text-slate-400">
                Pilih permohonan dari daftar di sebelah kiri untuk melihat rincian alur kerja.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
