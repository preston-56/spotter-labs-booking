export interface Booking {
  id: string;
  date: Date;
  timeSlot: string;
  cluster: string;
  floor: string;
  workstationId: string;
  workstation: string;
  workstations: string;
  deskIndex: number;
  hotDesk: string;
  user: string;
  userId: string;
  userName: string;
  userEmail: string;
  bookedBy:string;
  createdAt:Date;
  updatedAt:Date;
}

export type BookingUpdateDetails = {
  date: Date;
  timeSlot: string;
};
export interface BookingActionsProps {
  bookingId: string;
  initialDate: Date;
  initialTimeSlot: string;
  onReschedule: (id: string, details: BookingUpdateDetails) => void;
  onCancel: (bookingId: string) => void;
  size?: "sm" | "lg" | "default" | "icon";
}

export interface BookingsListProps {
  initialBookings: Booking[];
}
export interface RecentBookingsProps {
  bookings: Booking[];
}
export interface UseBookingsProps {
  initialBookings: Booking[];
}
export interface BookingItemProps {
  booking: Booking;
  onReschedule: (bookingId: string, newDetails: BookingUpdateDetails) => void;
  onCancel: (bookingId: string) => void;
}
export interface BookingType {
  id: string;
  date: Date;
  timeSlot: string;
  cluster: string;
  floor: string;
  workstation: string;
  workstations: string;
  workstationId: string;
  hotDesk: string;
  deskIndex: number;
  status?: "confirmed" | "pending" | "cancelled";
  bookedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  user: string;
  userId: string;
  userName: string;
  userEmail: string;
}
export interface BookingInfoProps {
  booking: BookingType;
  onReschedule: (id: string, details: BookingUpdateDetails) => void;
  onCancel: (bookingId: string) => void;
}
