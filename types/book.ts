import { Booking } from "@/types";

export interface BookingDetails {
    cluster: string;
    floor: string;
    workstation: string;
    hotDesk: string;
    date: Date | undefined;
    timeSlot: string;
  }

  export interface RecentBookingSlim {
    id: string;
    date: string;
    time: string;
    location: string;
    userName?: string;
    userEmail?: string;
  }

  export interface RecentBookingsSlimProps {
    bookings: RecentBookingSlim[];
  }
  export interface UseBookingFormProps {
    defaultBookingDetails?: Partial<BookingDetails>;
    redirectPath?: string;
    redirectDelay?: number;
  }
  export interface BookingFormProps {
    bookingDetails: BookingDetails;
    setBookingDetails: React.Dispatch<React.SetStateAction<BookingDetails>>;
    onSubmit: (e: React.FormEvent) => void;
  }
  export interface BookingSummaryProps {
    bookingDetails: BookingDetails;
    onReset: () => void;
    onSaveDraft: () => void;
  }

  export interface BookingWithUser extends Booking {
    userId: string;
    userName: string;
    userEmail: string;
  }

  export interface CompleteBookingDetails extends BookingWithUser {
    formattedDate: string;
    status: 'confirmed' | 'pending' | 'cancelled';
  }

  export type BookingStatus = 'confirmed' | 'pending' | 'cancelled';