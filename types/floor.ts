export interface Floor {
    id: string;
    name: string;
  }
  

  export interface FloorWorkstations {
    name: string;
    workstations: string[];
  }
  
  export type FloorAvailabilityData = Record<string, number>;

  export interface CalendarAvailabilityProps {
    floorData: FloorWorkstations[];
  }
  
  export interface FloorAvailabilityProps {
    floors: FloorAvailabilityData;
  }
  