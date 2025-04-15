// Mock data for bookings
export const mockBookings = [
    {
      id: "booking1",
      date: new Date(2025, 3, 10),
      timeSlot: "09:00 - 10:00",
      cluster: "HR",
      floor: "Floor 1",
      workstation: "Workstation 2",
      hotDesk: "HD 1"
    },
    {
      id: "booking2",
      date: new Date(2025, 3, 12),
      timeSlot: "14:00 - 15:00",
      cluster: "IT & Facilities",
      floor: "Floor 3",
      workstation: "Workstation 1",
      hotDesk: "HD 2"
    },
    {
      id: "booking3",
      date: new Date(2025, 3, 15),
      timeSlot: "11:00 - 12:00",
      cluster: "Marketing",
      floor: "Floor 2",
      workstation: "Workstation 5",
      hotDesk: "HD 3",
    },
    {
      id: "booking4",
      date: new Date(2025, 3, 15),
      timeSlot: "15:00 - 16:00",
      cluster: "Finance",
      floor: "Floor 2",
      workstation: "Workstation 3",
      hotDesk: "HD 4",
    },
  ];
  
  // Mock data for available workstations
  export const availableWorkstations = {
    "Floor 1": 15,
    "Floor 2": 10,
    "Floor 3": 20,
  };
  
  // Mock data for cluster utilization
  export const clusterUtilization = [
    { name: "General Direction", booked: 6, total: 15 },
    { name: "HR", booked: 10, total: 25 },
    { name: "Comms & Fundraising", booked: 5, total: 15 },
    { name: "IT & Facilities", booked: 7, total: 10 },
    { name: "Finance", booked: 4, total: 10 }
  ];