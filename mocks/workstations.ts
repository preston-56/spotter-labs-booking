export type WorkstationData = {
  id: string;
  floor: string;
  name: string;
  hotDesks: number;
  bookedDesks: number[];
  bookedBy: Record<number, string>;
};

export type SelectedDesk = {
  workstationId: string;
  deskIndex: number;
  isBooked: boolean;
  bookedBy?: string;
};

export const availableWorkstations = {
  "Floor 1": 15,
  "Floor 2": 10,
  "Floor 3": 20
};

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

export const initialWorkstations = [
  { id: "ws1", floor: "Floor 1", name: "Workstation 1", hotDesks: 5 },
  { id: "ws2", floor: "Floor 1", name: "Workstation 2", hotDesks: 5 },
  { id: "ws3", floor: "Floor 1", name: "Workstation 3", hotDesks: 4 },
  { id: "ws4", floor: "Floor 2", name: "Workstation 1", hotDesks: 4 },
  { id: "ws5", floor: "Floor 2", name: "Workstation 2", hotDesks: 3 },
  { id: "ws6", floor: "Floor 3", name: "Workstation 1", hotDesks: 6 },
  { id: "ws7", floor: "Floor 3", name: "Workstation 2", hotDesks: 7 },
  { id: "ws8", floor: "Floor 3", name: "Workstation 3", hotDesks: 5 },
  { id: "ws9", floor: "Floor 3", name: "Workstation 4", hotDesks: 8 }
];

// Enhanced workstation data with booking information
export const initialWorkstationsData: WorkstationData[] = [
  // Floor 1 - 3 Workstations
  {
    id: "ws1-1",
    floor: "Floor 1",
    name: "Workstation 1",
    hotDesks: 7,
    bookedDesks: [0, 3],
    bookedBy: { 0: "user5", 3: "user6" }
  },
  {
    id: "ws1-2",
    floor: "Floor 1",
    name: "Workstation 2",
    hotDesks: 7,
    bookedDesks: [0], // HD 1 is booked by Preston Osoro
    bookedBy: { 0: "user1" } // Preston Osoro
  },
  {
    id: "ws1-3",
    floor: "Floor 1",
    name: "Workstation 3",
    hotDesks: 6,
    bookedDesks: [2],
    bookedBy: { 2: "user4" }
  },

  // Floor 2 - 5 Workstations
  {
    id: "ws2-1",
    floor: "Floor 2",
    name: "Workstation 1",
    hotDesks: 4,
    bookedDesks: [1, 2],
    bookedBy: { 1: "user7", 2: "user8" }
  },
  {
    id: "ws2-2",
    floor: "Floor 2",
    name: "Workstation 2",
    hotDesks: 3,
    bookedDesks: [],
    bookedBy: {}
  },
  {
    id: "ws2-3",
    floor: "Floor 2",
    name: "Workstation 3",
    hotDesks: 4,
    bookedDesks: [3], // HD 4 is booked by Jane Smith
    bookedBy: { 3: "user2" } // Jane Smith
  },
  {
    id: "ws2-4",
    floor: "Floor 2",
    name: "Workstation 4",
    hotDesks: 3,
    bookedDesks: [0, 2],
    bookedBy: { 0: "user9", 2: "user10" }
  },
  {
    id: "ws2-5",
    floor: "Floor 2",
    name: "Workstation 5",
    hotDesks: 4,
    bookedDesks: [2], // HD 3 is booked by Preston Osoro
    bookedBy: { 2: "user1" } // Preston Osoro (same user, multiple bookings)
  },

  // Floor 3 - 4 Workstations
  {
    id: "ws3-1",
    floor: "Floor 3",
    name: "Workstation 1",
    hotDesks: 8,
    bookedDesks: [1], // HD 2 is booked by Bob Johnson
    bookedBy: { 1: "user3" } // Bob Johnson
  },
  {
    id: "ws3-2",
    floor: "Floor 3",
    name: "Workstation 2",
    hotDesks: 10,
    bookedDesks: [1, 3, 5, 7, 8],
    bookedBy: { 1: "user11", 3: "user12", 5: "user13", 7: "user14", 8: "user15" }
  },
  {
    id: "ws3-3",
    floor: "Floor 3",
    name: "Workstation 3",
    hotDesks: 8,
    bookedDesks: [3], // HD 4 is booked by Preston Osoro
    bookedBy: { 3: "user1" } // Preston Osoro (same user, multiple bookings)
  },
  {
    id: "ws3-4",
    floor: "Floor 3",
    name: "Workstation 4",
    hotDesks: 9,
    bookedDesks: [1, 3, 6],
    bookedBy: { 1: "user16", 3: "user17", 6: "user18" }
  }
];