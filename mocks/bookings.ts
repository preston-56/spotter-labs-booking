import { RecentBookingSlim } from "@/types";

export const mockBookings = [
  { id: "booking1", date: new Date(2025, 3, 10), timeSlot: "09:00 - 10:00", cluster: "HR", floor: "Floor 1", workstation: "Workstation 2", hotDesk: "HD 1" },
  { id: "booking2", date: new Date(2025, 3, 12), timeSlot: "14:00 - 15:00", cluster: "IT & Facilities", floor: "Floor 3", workstation: "Workstation 1", hotDesk: "HD 2" },
  { id: "booking3", date: new Date(2025, 3, 15), timeSlot: "11:00 - 12:00", cluster: "Marketing", floor: "Floor 2", workstation: "Workstation 5", hotDesk: "HD 3" },
  { id: "booking4", date: new Date(2025, 3, 15), timeSlot: "15:00 - 16:00", cluster: "Finance", floor: "Floor 2", workstation: "Workstation 3", hotDesk: "HD 4" },
  { id: "booking5", date: new Date(2025, 4, 15), timeSlot: "15:00 - 16:00", cluster: "HR", floor: "Floor 3", workstation: "Workstation 3", hotDesk: "HD 4" }
];

export const recentBookings: RecentBookingSlim[] = [
  { date: "Apr 12, 2025", time: "09:00 - 10:00", location: "Floor 1, WS 2" },
  { date: "Apr 10, 2025", time: "14:00 - 15:00", location: "Floor 3, WS 1" },
  { date: "Apr 8, 2025", time: "11:00 - 12:00", location: "Floor 2, WS 2" }
];