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
    id: "ws1",
    floor: "Floor 1",
    name: "Workstation 1",
    hotDesks: 7,
    bookedDesks: [0, 3], // 2 booked
    bookedBy: { 0: "John D.", 3: "Sarah M." }
  },
  {
    id: "ws2",
    floor: "Floor 1",
    name: "Workstation 2",
    hotDesks: 7,
    bookedDesks: [1, 4], // 2 booked
    bookedBy: { 1: "Mike R.", 4: "Lisa K." }
  },
  {
    id: "ws3",
    floor: "Floor 1",
    name: "Workstation 3",
    hotDesks: 6,
    bookedDesks: [0], // 1 booked
    bookedBy: { 0: "Tom W." }
  },

  // Floor 2 - 5 Workstations (Total: ~17 desks, Available: 10, Booked: 7)
  {
    id: "ws4",
    floor: "Floor 2",
    name: "Workstation 1",
    hotDesks: 4,
    bookedDesks: [1, 2], // 2 booked
    bookedBy: { 1: "Anna P.", 2: "David L." }
  },
  {
    id: "ws5",
    floor: "Floor 2",
    name: "Workstation 2",
    hotDesks: 3,
    bookedDesks: [], // 0 booked
    bookedBy: {}
  },
  {
    id: "ws2-3",
    floor: "Floor 2",
    name: "Workstation 3",
    hotDesks: 4,
    bookedDesks: [1,3], // 2 booked
    bookedBy: { 1: "Sarah K.", 3: "Jane Smith" }
  },
  {
    id: "ws2-4",
    floor: "Floor 2",
    name: "Workstation 4",
    hotDesks: 3,
    bookedDesks: [0, 2], // 2 booked
    bookedBy: { 0: "Mike T.", 2: "Lisa P." }
  },
  {
    id: "ws2-5",
    floor: "Floor 2",
    name: "Workstation 5",
    hotDesks: 4,
    bookedDesks: [2, 3], // 2 booked (HD 3 and HD 4)
    bookedBy: { 2: "John Doe", 3: "Emma R." }
  },

  // Floor 3 - 4 Workstations (Total: ~35 desks, Available: 20, Booked: 15)
  {
    id: "ws6",
    floor: "Floor 3",
    name: "Workstation 1",
    hotDesks: 8,
    bookedDesks: [0, 2, 4, 6], // 4 booked
    bookedBy: { 0: "Emma S.", 2: "Chris B.", 4: "Rachel T.", 6: "Alex K." }
  },
  {
    id: "ws7",
    floor: "Floor 3",
    name: "Workstation 2",
    hotDesks: 10,
    bookedDesks: [1, 3, 5, 7, 8], // 5 booked
    bookedBy: { 1: "Alex M.", 3: "Nina R.", 5: "Jake P.", 7: "Mia L.", 8: "Ryan S." }
  },
  {
    id: "ws8",
    floor: "Floor 3",
    name: "Workstation 3",
    hotDesks: 8,
    bookedDesks: [0, 2, 4], // 3 booked
    bookedBy: { 0: "Sophie L.", 2: "Mark H.", 4: "Zoe M." }
  },
  {
    id: "ws9",
    floor: "Floor 3",
    name: "Workstation 4",
    hotDesks: 9,
    bookedDesks: [1, 3, 6], // 3 booked
    bookedBy: { 1: "Oliver K.", 3: "Maya J.", 6: "Ryan C." }
  }
];