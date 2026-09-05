import { FileText, Inbox } from 'lucide-react';

interface QuickAccessButtonsProps {
  onOpenRequests: () => void;
  onOpenReports: () => void;
  pendingCount?: number;
}

export default function QuickAccessButtons({
  onOpenRequests,
  onOpenReports,
  pendingCount = 18,
}: QuickAccessButtonsProps) {
  return (
    <div
      id="card-akses-cepat"
      className="bg-[#091b33] border border-[#163761] rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-lg shadow-black/30 h-full"
    >
      {/* Header */}
      <div>
        <h2
          id="title-akses-cepat"
          className="text-sm font-bold text-white tracking-wide uppercase"
        >
          AKSES CEPAT
        </h2>
      </div>

      {/* Two Action Buttons Grid */}
      <div className="grid grid-cols-2 gap-3.5 my-2 flex-1 items-center">
        {/* Button 1: Permohonan Masuk */}
        <button
          id="btn-quick-permohonan-masuk"
          type="button"
          onClick={onOpenRequests}
          className="group relative bg-[#0a1e38] hover:bg-[#0f294c] border border-[#173a67] hover:border-sky-400/60 rounded-xl p-3.5 flex flex-col items-center justify-center text-center transition-all duration-200 cursor-pointer shadow-md hover:shadow-sky-500/20 active:scale-[0.98] h-28 sm:h-32"
        >
          {/* Badge count if pending */}
          {pendingCount > 0 && (
            <span
              id="badge-pending-count"
              className="absolute top-2 right-2 px-1.5 py-0.5 text-[10px] font-bold bg-amber-500 text-black rounded-full shadow-sm"
              title={`${pendingCount} permohonan dalam proses`}
            >
              {pendingCount}
            </span>
          )}

          {/* Circular Cyan Glow Icon matching screenshot */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-b from-[#0284c7] to-[#0369a1] border border-sky-400/40 flex items-center justify-center shadow-[0_0_15px_rgba(56,189,248,0.45)] group-hover:scale-108 transition-transform">
            <Inbox className="w-6 h-6 text-white" />
          </div>

          <span className="text-xs sm:text-[13px] font-semibold text-white mt-2.5 tracking-wide group-hover:text-sky-200 transition-colors">
            Permohonan Masuk
          </span>
        </button>

        {/* Button 2: Laporan Kinerja */}
        <button
          id="btn-quick-laporan-kinerja"
          type="button"
          onClick={onOpenReports}
          className="group relative bg-[#0a1e38] hover:bg-[#0f294c] border border-[#173a67] hover:border-sky-400/60 rounded-xl p-3.5 flex flex-col items-center justify-center text-center transition-all duration-200 cursor-pointer shadow-md hover:shadow-sky-500/20 active:scale-[0.98] h-28 sm:h-32"
        >
          {/* Circular Cyan Glow Icon with Document/PDF glyph */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-b from-[#0284c7] to-[#0369a1] border border-sky-400/40 flex items-center justify-center shadow-[0_0_15px_rgba(56,189,248,0.45)] group-hover:scale-108 transition-transform relative">
            <FileText className="w-6 h-6 text-white" />
            <span className="absolute bottom-1 right-1 text-[7px] font-extrabold bg-white text-[#0369a1] px-0.5 rounded leading-none">
              PDF
            </span>
          </div>

          <span className="text-xs sm:text-[13px] font-semibold text-white mt-2.5 tracking-wide group-hover:text-sky-200 transition-colors">
            Laporan Kinerja
          </span>
        </button>
      </div>
    </div>
  );
}
