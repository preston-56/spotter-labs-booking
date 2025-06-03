import { format } from "date-fns";
import { RecentBookingSlim} from "@/types";

export const mockBookings = [
  {
    id: "booking1",
    date: new Date(2025, 3, 10),
    timeSlot: "09:00 - 10:00",
    cluster: "HR",
    floor: "Floor 1",
    workstation: "Workstation 2",
    hotDesk: "HD 1",
    userId: "user1",
    userName: "Preston Osoro",
    userEmail: "preston.osoro@spotter.org"
  },
  {
    id: "booking2",
    date: new Date(2025, 3, 12),
    timeSlot: "14:00 - 15:00",
    cluster: "IT & Facilities",
    floor: "Floor 3",
    workstation: "Workstation 1",
    hotDesk: "HD 2",
    userId: "user3",
    userName: "Bob Johnson",
    userEmail: "bob.johnson@spotter.org"
  },
  {
    id: "booking3",
    date: new Date(2025, 3, 15),
    timeSlot: "11:00 - 12:00",
    cluster: "Marketing",
    floor: "Floor 2",
    workstation: "Workstation 5",
    hotDesk: "HD 3",
    userId: "user1",
    userName: "Preston Osoro",
    userEmail: "preston.osoro@spotter.org"
  },
  {
    id: "booking4",
    date: new Date(2025, 3, 15),
    timeSlot: "15:00 - 16:00",
    cluster: "Finance",
    floor: "Floor 2",
    workstation: "Workstation 3",
    hotDesk: "HD 4",
    userId: "user2",
    userName: "Jane Smith",
    userEmail: "jane.smith@spotter.org"
  },
  {
    id: "booking5",
    date: new Date(2025, 4, 15),
    timeSlot: "15:00 - 16:00",
    cluster: "HR",
    floor: "Floor 3",
    workstation: "Workstation 3",
    hotDesk: "HD 4",
    userId: "user1",
    userName: "Preston Osoro",
    userEmail: "preston.osoro@spotter.org"
  }
];

export const recentBookings: RecentBookingSlim[] = mockBookings
  .slice(-3)  /*take last 3 items from array */
  .map((booking) => ({
    id: booking.id,
    date: format(booking.date, "MMM dd, yyyy"),
    time: booking.timeSlot,
    location: `${booking.floor}, ${booking.workstation}`,
    userName: booking.userName,
    userEmail: booking.userEmail
  }));

// Helper function for booking detail page
export const getBookingById = (bookingId: string) => {
  return mockBookings.find(booking => booking.id === bookingId);
};