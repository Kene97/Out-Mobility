import type {
  Campaign,
  CampaignStats,
  Device,
  AnalyticsSummary,
  FraudRecord,
  SystemHealth,
  Report,
  User,
} from "@/types";

export const mockUser: User = {
  id: "u1",
  name: "Amara Okafor",
  email: "amara@brandx.com",
  role: "advertiser",
  companyName: "Brand X Nigeria",
  createdAt: "2026-01-15",
};

export const mockAdminUser: User = {
  id: "a1",
  name: "Kene Omenuko-Rene",
  email: "omenukorekene@gmail.com",
  role: "admin",
  createdAt: "2025-11-01",
};

export const mockCampaigns: Campaign[] = [
  {
    id: "c1",
    name: "Brand Awareness May 2026",
    status: "active",
    startDate: "2026-05-01",
    endDate: "2026-05-31",
    budget: 2000,
    spent: 940,
    impressions: 48201,
    cpm: 6.58,
    targetCity: "Lagos, Nigeria",
    targetRadius: "city-wide",
    creativeName: "brand_awareness_may.mp4",
    creativeDuration: 30,
    estimatedImpressions: 307000,
    createdAt: "2026-04-28",
  },
  {
    id: "c2",
    name: "Promo Flash Sale",
    status: "active",
    startDate: "2026-05-10",
    endDate: "2026-05-20",
    budget: 1500,
    spent: 1200,
    impressions: 62130,
    cpm: 5.12,
    targetCity: "Lagos, Nigeria",
    targetRadius: "center",
    creativeName: "promo_flash.mp4",
    creativeDuration: 15,
    estimatedImpressions: 190000,
    createdAt: "2026-05-08",
  },
  {
    id: "c3",
    name: "Product Launch Q2",
    status: "paused",
    startDate: "2026-05-01",
    endDate: "2026-06-01",
    budget: 3000,
    spent: 700,
    impressions: 32560,
    cpm: 7.2,
    targetCity: "Abuja, Nigeria",
    targetRadius: "city-wide",
    creativeName: "q2_launch.mp4",
    creativeDuration: 45,
    estimatedImpressions: 420000,
    createdAt: "2026-04-20",
  },
  {
    id: "c4",
    name: "Summer Collection",
    status: "draft",
    startDate: "2026-05-30",
    endDate: "2026-06-30",
    budget: 2500,
    spent: 0,
    impressions: 0,
    cpm: 0,
    targetCity: "Lagos, Nigeria",
    targetRadius: "city-wide",
    createdAt: "2026-05-03",
  },
  {
    id: "c5",
    name: "April Ramadan Push",
    status: "completed",
    startDate: "2026-04-01",
    endDate: "2026-04-30",
    budget: 2100,
    spent: 2100,
    impressions: 112400,
    cpm: 5.3,
    targetCity: "Lagos, Nigeria",
    targetRadius: "city-wide",
    creativeName: "ramadan_push.mp4",
    creativeDuration: 30,
    estimatedImpressions: 280000,
    createdAt: "2026-03-25",
  },
];

export const mockCampaignStats: CampaignStats = {
  campaignId: "c1",
  totalImpressions: 48201,
  verifiedImpressions: 46890,
  totalSpent: 940,
  cpm: 6.58,
  daysRemaining: 8,
  dailyData: [
    { date: "May 1", impressions: 4200 },
    { date: "May 3", impressions: 5100 },
    { date: "May 5", impressions: 4800 },
    { date: "May 7", impressions: 6200 },
    { date: "May 9", impressions: 5900 },
    { date: "May 11", impressions: 7100 },
    { date: "May 13", impressions: 6800 },
    { date: "May 15", impressions: 8101 },
  ],
  deviceDelivery: [
    { deviceId: "DEV-001", impressions: 4201, uptime: 94, status: "online" },
    { deviceId: "DEV-002", impressions: 3890, uptime: 88, status: "online" },
    { deviceId: "DEV-007", impressions: 2100, uptime: 71, status: "paused" },
    { deviceId: "DEV-012", impressions: 5320, uptime: 97, status: "online" },
    { deviceId: "DEV-015", impressions: 4690, uptime: 92, status: "online" },
    { deviceId: "DEV-023", impressions: 3200, uptime: 81, status: "online" },
  ],
};

export const mockAnalytics: AnalyticsSummary = {
  totalImpressions: 142891,
  impressionsTrend: 12,
  activeCampaigns: 3,
  campaignsTrend: 1,
  totalSpent: 2840,
  spentTrend: 8,
  verifiedRate: 97.3,
  verifiedTrend: 0.4,
};

export const mockDevices: Device[] = [
  { id: "d1", deviceId: "DEV-001", operatorId: "op1", operatorName: "Fleet Alpha", status: "online", lastSeen: "2026-05-04T10:30:00Z", uptime: 94, impressionsToday: 312, lat: 6.524, lng: 3.379, city: "Lagos" },
  { id: "d2", deviceId: "DEV-002", operatorId: "op1", operatorName: "Fleet Alpha", status: "online", lastSeen: "2026-05-04T10:28:00Z", uptime: 88, impressionsToday: 289, lat: 6.517, lng: 3.368, city: "Lagos" },
  { id: "d3", deviceId: "DEV-007", operatorId: "op2", operatorName: "Fleet Beta", status: "paused", lastSeen: "2026-05-04T08:15:00Z", uptime: 71, impressionsToday: 0, lat: 6.531, lng: 3.384, city: "Lagos" },
  { id: "d4", deviceId: "DEV-012", operatorId: "op2", operatorName: "Fleet Beta", status: "online", lastSeen: "2026-05-04T10:29:00Z", uptime: 97, impressionsToday: 401, lat: 6.545, lng: 3.392, city: "Lagos" },
  { id: "d5", deviceId: "DEV-015", operatorId: "op3", operatorName: "Fleet Gamma", status: "offline", lastSeen: "2026-05-03T22:10:00Z", uptime: 0, impressionsToday: 0, lat: 6.498, lng: 3.356, city: "Lagos" },
  { id: "d6", deviceId: "DEV-023", operatorId: "op3", operatorName: "Fleet Gamma", status: "online", lastSeen: "2026-05-04T10:31:00Z", uptime: 81, impressionsToday: 198, lat: 6.511, lng: 3.362, city: "Lagos" },
];

export const mockFraudRecords: FraudRecord[] = [
  { id: "f1", deviceId: "DEV-099", campaignId: "c1", campaignName: "Brand Awareness May 2026", date: "2026-05-03", impressions: 1240, flag: "suspicious", reason: "Abnormal impression velocity" },
  { id: "f2", deviceId: "DEV-047", campaignId: "c2", campaignName: "Promo Flash Sale", date: "2026-05-02", impressions: 580, flag: "invalid", reason: "Device GPS outside target area" },
  { id: "f3", deviceId: "DEV-012", campaignId: "c1", campaignName: "Brand Awareness May 2026", date: "2026-05-01", impressions: 4201, flag: "valid" },
];

export const mockSystemHealth: SystemHealth = {
  apiStatus: "healthy",
  devicePipelineStatus: "healthy",
  activeDevices: 142,
  totalDevices: 167,
  impressionsToday: 14820,
  lastUpdated: "2026-05-04T10:31:00Z",
};

export const mockReports: Report[] = [
  { id: "r1", campaignId: "c1", campaignName: "Brand Awareness May 2026", period: "May 1–31 2026", generatedAt: "2026-05-04" },
  { id: "r2", campaignId: "c2", campaignName: "Promo Flash Sale", period: "May 10–20 2026", generatedAt: "2026-05-04" },
  { id: "r5", campaignId: "c5", campaignName: "April Ramadan Push", period: "Apr 1–30 2026", generatedAt: "2026-05-01" },
];
