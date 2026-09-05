import { useState } from 'react';

interface MapRegion {
  id: string;
  name: string;
  unit: string;
  level: 'Tinggi' | 'Sedang' | 'Rendah';
  color: string;
  count: number;
  sla: number;
  description: string;
}

interface MapDistributionProps {
  onSelectRegion?: (region: MapRegion) => void;
}

export default function MapDistribution({ onSelectRegion }: MapDistributionProps) {
  const [hoveredRegion, setHoveredRegion] = useState<MapRegion | null>(null);

  const regions: MapRegion[] = [
    {
      id: 'kaltara-bulungan',
      name: 'Kalimantan Utara & Bulungan',
      unit: 'UP3 Kaltara',
      level: 'Sedang',
      color: '#38bdf8',
      count: 156,
      sla: 97.9,
      description: 'Tarakan, Tanjung Selor, Nunukan & Malinau',
    },
    {
      id: 'berau-kutim',
      name: 'Berau & Kutai Timur',
      unit: 'UP3 Berau & Sangatta',
      level: 'Sedang',
      color: '#38bdf8',
      count: 206,
      sla: 98.1,
      description: 'Pesisir Utara Kaltim & Kepulauan Derawan',
    },
    {
      id: 'kukar-inland',
      name: 'Kutai Kartanegara Barat & Mahakam Ulu',
      unit: 'UP3 Samarinda (Area Barat)',
      level: 'Sedang',
      color: '#38bdf8',
      count: 117,
      sla: 97.5,
      description: 'DAS Mahakam, Sendawar & Long Bagun',
    },
    {
      id: 'samarinda-bontang-bpn',
      name: 'Koridor Utama Pesisir Timur (Balikpapan - Samarinda - IKN - Paser)',
      unit: 'UP3 Balikpapan, Samarinda, Bontang & Nusantara',
      level: 'Tinggi',
      color: '#f59e0b',
      count: 758,
      sla: 99.0,
      description: 'Pusat Beban Utama & Kawasan Inti Pusat Pemerintahan IKN',
    },
  ];

  return (
    <div
      id="card-sebaran-permohonan"
      className="bg-[#091b33] border border-[#163761] rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-lg shadow-black/30 relative overflow-hidden h-full min-h-[360px]"
    >
      {/* Header */}
      <div>
        <h2
          id="title-sebaran-permohonan"
          className="text-sm font-bold text-white tracking-wide uppercase"
        >
          SEBARAN PERMOHONAN PER UNIT
        </h2>
        <p className="text-xs text-slate-300 font-medium mt-0.5">
          Total Permohonan
        </p>
      </div>

      {/* Map Graphic Area */}
      <div className="relative flex-1 flex items-center justify-center my-3 w-full">
        <svg
          viewBox="0 0 400 380"
          className="w-full h-auto max-h-[250px] drop-shadow-[0_8px_20px_rgba(0,0,0,0.5)] select-none"
          aria-label="Peta Sebaran Permohonan UID Kaltimra"
        >
          <defs>
            <filter id="glow-gold" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#f59e0b" floodOpacity="0.35" />
            </filter>
            <filter id="glow-blue" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#38bdf8" floodOpacity="0.3" />
            </filter>
          </defs>

          {/* Region 1: Northern & Northwestern Kaltara (Sedang - Light Blue) */}
          <path
            id="map-path-kaltara"
            d="M 175 35 
               C 210 25, 255 40, 275 65 
               C 290 85, 310 115, 295 140 
               C 280 155, 260 160, 245 150 
               C 230 140, 215 145, 195 130 
               C 175 115, 160 90, 155 60 
               Z"
            fill="#7dd3fc"
            stroke="#071b36"
            strokeWidth="2.5"
            className="transition-all duration-300 hover:brightness-110 cursor-pointer"
            onMouseEnter={() => setHoveredRegion(regions[0])}
            onMouseLeave={() => setHoveredRegion(null)}
            onClick={() => onSelectRegion?.(regions[0])}
          />

          {/* Region 2: Inland Central & Western Kaltim - Kukar / Kubar / Mahulu (Sedang - Blue) */}
          <path
            id="map-path-inland-kaltim"
            d="M 155 60 
               C 160 90, 175 115, 195 130 
               C 205 140, 210 160, 205 185 
               C 195 210, 180 235, 175 260 
               C 165 255, 140 255, 120 240 
               C 95 220, 80 180, 85 145 
               C 90 110, 125 75, 155 60 
               Z"
            fill="#38bdf8"
            stroke="#071b36"
            strokeWidth="2.5"
            className="transition-all duration-300 hover:brightness-110 cursor-pointer"
            onMouseEnter={() => setHoveredRegion(regions[2])}
            onMouseLeave={() => setHoveredRegion(null)}
            onClick={() => onSelectRegion?.(regions[2])}
          />

          {/* Region 3: Berau & East Kutai Peninsula (Sedang - Blue) */}
          <path
            id="map-path-berau-peninsula"
            d="M 245 150 
               C 260 160, 280 155, 295 140 
               C 315 155, 335 180, 315 200 
               C 290 215, 260 210, 235 200 
               C 215 190, 210 165, 225 150 
               Z"
            fill="#7dd3fc"
            stroke="#071b36"
            strokeWidth="2.5"
            className="transition-all duration-300 hover:brightness-110 cursor-pointer"
            onMouseEnter={() => setHoveredRegion(regions[1])}
            onMouseLeave={() => setHoveredRegion(null)}
            onClick={() => onSelectRegion?.(regions[1])}
          />

          {/* Region 4: Eastern Coastal Corridor: Bontang, Samarinda, Balikpapan, PPU/IKN, Paser (Tinggi - Bright Yellow/Gold matching screenshot!) */}
          <path
            id="map-path-coastal-high-activity"
            d="M 235 200 
               C 255 210, 285 215, 280 230 
               C 275 250, 255 260, 250 280 
               C 245 305, 240 330, 230 350 
               C 220 365, 205 355, 195 330 
               C 190 310, 200 295, 205 280 
               C 210 260, 205 240, 205 210 
               C 210 195, 220 195, 235 200 
               Z"
            fill="#f59e0b"
            stroke="#071b36"
            strokeWidth="2.5"
            filter="url(#glow-gold)"
            className="transition-all duration-300 hover:brightness-110 cursor-pointer"
            onMouseEnter={() => setHoveredRegion(regions[3])}
            onMouseLeave={() => setHoveredRegion(null)}
            onClick={() => onSelectRegion?.(regions[3])}
          />

          {/* Region 5: Paser Southern Strip (Tinggi - Yellow) */}
          <path
            id="map-path-paser-south"
            d="M 195 330 
               C 205 355, 220 365, 200 375 
               C 185 380, 175 365, 180 345 
               C 183 335, 190 330, 195 330 
               Z"
            fill="#f59e0b"
            stroke="#071b36"
            strokeWidth="2.5"
            filter="url(#glow-gold)"
            className="transition-all duration-300 hover:brightness-110 cursor-pointer"
            onMouseEnter={() => setHoveredRegion(regions[3])}
            onMouseLeave={() => setHoveredRegion(null)}
            onClick={() => onSelectRegion?.(regions[3])}
          />

          {/* Landmark Marker Dots */}
          <circle cx="240" cy="275" r="3.5" fill="#ffffff" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="248" y="278" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="sans-serif">
            Samarinda
          </text>

          <circle cx="228" cy="308" r="3.5" fill="#ffffff" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="236" y="311" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="sans-serif">
            Balikpapan / IKN
          </text>

          <circle cx="270" cy="225" r="3" fill="#ffffff" stroke="#f59e0b" strokeWidth="1" />
          <text x="277" y="228" fill="#e2e8f0" fontSize="8" fontWeight="600" fontFamily="sans-serif">
            Bontang
          </text>
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredRegion && (
          <div
            id="map-hover-tooltip"
            className="absolute top-2 right-2 bg-[#061427]/95 border border-[#1b3d6a] p-2.5 rounded-xl shadow-xl backdrop-blur-md max-w-[210px] pointer-events-none z-10 transition-all animate-fadeIn"
          >
            <div className="flex items-center gap-1.5 mb-1">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: hoveredRegion.color }}
              />
              <span className="text-[11px] font-bold text-white uppercase tracking-wider">
                {hoveredRegion.level}
              </span>
            </div>
            <div className="text-xs font-semibold text-sky-200 leading-tight">
              {hoveredRegion.name}
            </div>
            <div className="text-[11px] text-slate-300 mt-1">
              Permohonan: <strong className="text-amber-400">{hoveredRegion.count}</strong>
            </div>
            <div className="text-[11px] text-slate-300">
              SLA Tercapai: <strong className="text-emerald-400">{hoveredRegion.sla}%</strong>
            </div>
          </div>
        )}
      </div>

      {/* Legend Footer */}
      <div
        id="map-legend"
        className="flex items-center gap-4 text-xs font-medium text-slate-300 pt-2 border-t border-[#143257]/40"
      >
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] shadow-[0_0_6px_#f59e0b]" />
          <span>Tinggi</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8] shadow-[0_0_6px_#38bdf8]" />
          <span>Sedang</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#1e3a5f]" />
          <span>Rendah</span>
        </div>
      </div>
    </div>
  );
}
