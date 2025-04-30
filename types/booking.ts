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

export interface BookingsListProps {
  initialBookings: Booking[];
}
export interface RecentBookingsProps {
  bookings: Booking[];
}

export interface UseBookingsProps {
  initialBookings: Booking[];
}
