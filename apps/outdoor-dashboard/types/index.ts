// ── Campaign ──────────────────────────────────────────────────────────

export type CampaignStatus =
  | "draft"
  | "submitted"
  | "active"
  | "paused"
  | "completed"
  | "cancelled";

export interface Campaign {
  id: string;
  name: string;
  status: CampaignStatus;
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  impressions: number;
  cpm: number;
  targetCity: string;
  targetRadius: "city-wide" | "center" | "custom";
  customRadius?: number;
  creativeUrl?: string;
  creativeName?: string;
  creativeDuration?: number;
  estimatedImpressions?: number;
  createdAt: string;
}

export interface CampaignStats {
  campaignId: string;
  totalImpressions: number;
  verifiedImpressions: number;
  totalSpent: number;
  cpm: number;
  daysRemaining: number;
  dailyData: DailyDataPoint[];
  deviceDelivery: DeviceDelivery[];
}

export interface DailyDataPoint {
  date: string;
  impressions: number;
}

export interface DeviceDelivery {
  deviceId: string;
  impressions: number;
  uptime: number;
  status: "online" | "offline" | "paused";
}

export interface CreateCampaignInput {
  name: string;
  startDate: string;
  endDate: string;
  budget: number;
  targetCity: string;
  targetRadius: "city-wide" | "center" | "custom";
  customRadius?: number;
  creativeFile?: File;
}

// ── User / Auth ───────────────────────────────────────────────────────

export type UserRole = "advertiser" | "admin" | "operator";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  companyName?: string;
  avatarUrl?: string;
  createdAt: string;
}

// ── Device ────────────────────────────────────────────────────────────

export type DeviceStatus = "online" | "offline" | "paused";

export interface Device {
  id: string;
  deviceId: string;
  operatorId: string;
  operatorName: string;
  status: DeviceStatus;
  lastSeen: string;
  uptime: number;
  impressionsToday: number;
  lat?: number;
  lng?: number;
  city: string;
}

// ── Analytics ─────────────────────────────────────────────────────────

export interface AnalyticsSummary {
  totalImpressions: number;
  impressionsTrend: number;
  activeCampaigns: number;
  campaignsTrend: number;
  totalSpent: number;
  spentTrend: number;
  verifiedRate: number;
  verifiedTrend: number;
}

// ── Admin ─────────────────────────────────────────────────────────────

export type FraudFlag = "suspicious" | "invalid" | "valid";

export interface FraudRecord {
  id: string;
  deviceId: string;
  campaignId: string;
  campaignName: string;
  date: string;
  impressions: number;
  flag: FraudFlag;
  reason?: string;
}

export interface SystemHealth {
  apiStatus: "healthy" | "degraded" | "down";
  devicePipelineStatus: "healthy" | "degraded" | "down";
  activeDevices: number;
  totalDevices: number;
  impressionsToday: number;
  lastUpdated: string;
}

// ── Reports ───────────────────────────────────────────────────────────

export interface Report {
  id: string;
  campaignId: string;
  campaignName: string;
  period: string;
  generatedAt: string;
}
