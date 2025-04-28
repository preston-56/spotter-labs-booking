
// Mock data for clusters
export const initialClusters = [
    { id: "01", name: "General Direction", size: 15 },
    { id: "02", name: "HR", size: 25 },
    { id: "03", name: "Comms & Fundraising", size: 15 },
    { id: "04", name: "IT & Facilities", size: 10 },
    { id: "05", name: "Finance", size: 10 },
  ]
  
  // Mock data for floors
 export  const initialFloors = [
    { id: "floor1", name: "Floor 1" },
    { id: "floor2", name: "Floor 2" },
    { id: "floor3", name: "Floor 3" },
  ]
  
  // Mock data for workstations
export const initialWorkstations = [
    { id: "ws1", floor: "Floor 1", name: "Workstation 1", hotDesks: 5 },
    { id: "ws2", floor: "Floor 1", name: "Workstation 2", hotDesks: 5 },
    { id: "ws3", floor: "Floor 1", name: "Workstation 3", hotDesks: 4 },
    { id: "ws4", floor: "Floor 2", name: "Workstation 1", hotDesks: 4 },
    { id: "ws5", floor: "Floor 2", name: "Workstation 2", hotDesks: 3 },
    { id: "ws6", floor: "Floor 3", name: "Workstation 1", hotDesks: 6 },
    { id: "ws7", floor: "Floor 3", name: "Workstation 2", hotDesks: 7 },
    { id: "ws8", floor: "Floor 3", name: "Workstation 3", hotDesks: 5 },
    { id: "ws9", floor: "Floor 3", name: "Workstation 4", hotDesks: 8 },
  ]
  
  // Mock data for users
 export  const initialUsers = [
    { id: "user1", name: "Preston Osoro", email: "preston.osoro@spotter.org", cluster: "HR" },
    { id: "user2", name: "Jane Smith", email: "jane.smith@spotter.org", cluster: "Finance" },
    { id: "user3", name: "Bob Johnson", email: "bob.johnson@spotter.org", cluster: "IT & Facilities" },
    { id: "user4", name: "Alice Brown", email: "alice.brown@spotter.org", cluster: "Comms & Fundraising" },
    { id: "user5", name: "Charlie Wilson", email: "charlie.wilson@spotter.org", cluster: "General Direction" },
  ]