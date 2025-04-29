export interface Cluster {
    id: string;
    name: string;
    size: string;
  }
  
  export interface Floor {
    id: string;
    name: string;
  }
  
  export interface Workstation {
    id: string;
    name: string;
  }
  
  export interface HotDesk {
    id: string;
    name: string;
  }
  
  export interface BookingDetails {
    cluster: string;
    floor: string;
    workstation: string;
    hotDesk: string;
    date: Date | undefined;
    timeSlot: string;
  }
  
  export interface RecentBooking {
    date: string;
    time: string;
    location: string;
  }
  