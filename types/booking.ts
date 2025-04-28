export interface Booking {
    id: string;
    date: Date;
    timeSlot: string;
    cluster: string;
    floor: string;
    workstation: string;
    hotDesk: string;
  }
  
  export type BookingUpdateDetails = {
    date: Date;
    timeSlot: string;
  };
  
  export interface StatsData {
    totalBookings: { value: string; subtext: string };
    availableWorkstations: { value: string; subtext: string };
    utilizationRate: { value: string; subtext: string };
    peakHours: { value: string; subtext: string };
  }
  
  export interface ClusterData {
    name: string;
    booked: number;
    total: number;
  }
  
  export interface FloorWorkstations {
    name: string;
    workstations: string[];
  }
  
  export type FloorAvailabilityData = Record<string, number>;