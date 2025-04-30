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

  export interface UseBookingFormProps {
    defaultBookingDetails?: Partial<BookingDetails>;
    redirectPath?: string;
    redirectDelay?: number;
  }