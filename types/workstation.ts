import { BookingType } from "@/types";
export interface Workstation {
  id: string;
  floor: string;
  name: string;
  hotDesks: number;
}
export interface WorkstationSelectionProps {
  selectedValues: {
    floor: string;
    workstation: string;
    hotDesk: string;
  };
  disabledStates: {
    floor: boolean;
    workstation: boolean;
    hotDesk: boolean;
  };
  onFloorChange: (value: string) => void;
  onWorkstationChange: (value: string) => void;
  onHotDeskChange: (value: string) => void;
}
export interface SimilarWorkstationsProps {
  booking: BookingType;
}
export interface WorkstationOptionProps {
  floor: string;
  workstation: string;
  hotDesk: string;
  availability: string;
}