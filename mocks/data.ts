import { StatsData, ClusterData, FloorAvailabilityData, FloorWorkstations, Booking } from "@/types/booking";

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

// Dashboard stats data
export const statsData: StatsData = {
  totalBookings: { value: "24", subtext: "+5% from last week" },
  availableWorkstations: { value: "35", subtext: "Across all floors" },
  utilizationRate: { value: "65%", subtext: "+10% from last month" },
  peakHours: { value: "10:00 - 14:00", subtext: "Highest booking demand" }
};

  // Mock data for clusters
export const clusters = [
  { id: "01", name: "General Direction", size: 15 },
  { id: "02", name: "HR", size: 25 },
  { id: "03", name: "Comms & Fundraising", size: 15 },
  { id: "04", name: "IT & Facilities", size: 10 },
  { id: "05", name: "Finance", size: 10 },
  { id: "06", name: "Senior/MT Level Hosted Roles", size: 10 },
  { id: "07", name: "Sensitive Medical Profiles", size: 10 },
  { id: "08", name: "OCP Cell 9", size: 5 },
  { id: "09", name: "OCBA Cell 5", size: 15 },
  { id: "10", name: "OCA", size: 20 },
  { id: "11", name: "EAA", size: 5 },
  { id: "12", name: "Other Hosted Roles", size: 60 }
];

// Mock data for floors
export const floors = [
  { id: "floor1", name: "Floor 1" },
  { id: "floor2", name: "Floor 2" },
  { id: "floor3", name: "Floor 3" }
];

// Mock data for workstations
export const workstations = {
  floor1: [
    { id: "ws1-1", name: "Workstation 1" },
    { id: "ws1-2", name: "Workstation 2" },
    { id: "ws1-3", name: "Workstation 3" }
  ],
  floor2: [
    { id: "ws2-1", name: "Workstation 1" },
    { id: "ws2-2", name: "Workstation 2" }
  ],
  floor3: [
    { id: "ws3-1", name: "Workstation 1" },
    { id: "ws3-2", name: "Workstation 2" },
    { id: "ws3-3", name: "Workstation 3" },
    { id: "ws3-4", name: "Workstation 4" }
  ]
};

// Mock data for hot desks
export const hotDesks = {
  "ws1-1": [
    { id: "hd1-1-1", name: "HD 1" },
    { id: "hd1-1-2", name: "HD 2" }
  ],
  "ws1-2": [
    { id: "hd1-2-1", name: "HD 1" },
    { id: "hd1-2-2", name: "HD 2" }
  ],
  "ws1-3": [{ id: "hd1-3-1", name: "HD 1" }],
  "ws2-1": [
    { id: "hd2-1-1", name: "HD 1" },
    { id: "hd2-1-2", name: "HD 2" },
    { id: "hd2-1-3", name: "HD 3" }
  ],
  "ws2-2": [{ id: "hd2-2-1", name: "HD 1" }],
  "ws3-1": [
    { id: "hd3-1-1", name: "HD 1" },
    { id: "hd3-1-2", name: "HD 2" }
  ],
  "ws3-2": [{ id: "hd3-2-1", name: "HD 1" }],
  "ws3-3": [
    { id: "hd3-3-1", name: "HD 1" },
    { id: "hd3-3-2", name: "HD 2" }
  ],
  "ws3-4": [{ id: "hd3-4-1", name: "HD 1" }]
};

// Time slots
export const timeSlots = [
  "08:00 - 09:00",
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "12:00 - 13:00",
  "13:00 - 14:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
  "16:00 - 17:00"
];
