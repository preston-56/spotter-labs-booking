export interface StatsData {
  totalBookings: { value: string; subtext: string };
  availableWorkstations: { value: string; subtext: string };
  utilizationRate: { value: string; subtext: string };
  peakHours: { value: string; subtext: string };
}

export interface DashboardStatsProps {
  stats: StatsData;
}
