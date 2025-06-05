import { StatsData } from "@/types";

export const statsData: StatsData = {
  totalBookings: { value: "24", subtext: "+5% from last week" },
  availableWorkstations: { value: "18", subtext: "Across all floors" },
  utilizationRate: { value: "65%", subtext: "+10% from last month" },
  peakHours: { value: "10:00 - 14:00", subtext: "Highest booking demand" }
};

export const clusterUtilization = [
  { name: "General Direction", booked: 6, total: 15 },
  { name: "HR", booked: 10, total: 25 },
  { name: "Comms & Fundraising", booked: 5, total: 15 },
  { name: "IT & Facilities", booked: 7, total: 10 },
  { name: "Finance", booked: 4, total: 10 }
];
