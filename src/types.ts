export type RequestCategory =
  | 'Informasi Publik'
  | 'Data & Dokumen'
  | 'Layanan Publik'
  | 'Keuangan'
  | 'Lainnya';

export type ServiceStatus = 'Selesai' | 'Proses' | 'Tertunda';

export type SlaStage =
  | 'H-10 (Baru Masuk)'
  | 'H-7 (Reminder)'
  | 'H-4 (Warning)'
  | 'H-2 (Critical Alert)'
  | 'H+1 (Pelanggaran SLA)'
  | 'Tepat Waktu'
  | 'Terpenuhi';

export type ClassificationType =
  | 'DIP (Daftar Informasi Publik)'
  | 'DIK (Dikecualikan)'
  | 'Dalam Verifikasi';

export interface Ticket {
  id: string;
  ticketNumber: string;
  applicantName: string;
  applicantCategory: 'Individu' | 'LSM' | 'Media' | 'Akademisi' | 'Instansi';
  receivedAt: string;
  dueAt: string;
  channel: 'Web Portal' | 'Meja Layanan' | 'Surat Resmi' | 'Email PPID';
  subject: string;
  description: string;
  unit: string;
  category: RequestCategory;
  status: ServiceStatus;
  slaStage: SlaStage;
  slaRemainingDays: number;
  resolutionDays?: number;
  picName: string;
  picDepartment: string;
  classification: ClassificationType;
  extensionApproved: boolean;
  documentCount: number;
}

export interface UnitStat {
  name: string;
  code: string;
  region: 'Balikpapan' | 'Samarinda' | 'Bontang' | 'Kaltara' | 'Berau' | 'Nusantara' | 'Kutai' | 'Paser';
  count: number;
  slaPercent: number;
  avgDays: number;
  level: 'Tinggi' | 'Sedang' | 'Rendah';
}

export interface CategoryStat {
  category: RequestCategory;
  percentage: number;
  count: number;
  color: string;
}

export interface MonthlyTrend {
  month: string;
  fullMonth: string;
  requests: number;
  resolved: number;
  slaRate: number;
}

export interface DashboardMetrics {
  totalRequests: number;
  slaAchievement: number;
  averageDays: number;
  activeUnits: number;
  statusBreakdown: {
    selesai: { count: number; percentage: number };
    proses: { count: number; percentage: number };
    tertunda: { count: number; percentage: number };
  };
}

export interface UserRoleConfig {
  role: 'Manager Komunikasi' | 'Pengelola Informasi' | 'Information Owner' | 'Auditor PPID';
  name: string;
  email: string;
}
