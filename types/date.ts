export interface DateTimeSelectionProps {
    date: Date | undefined;
    timeSlot: string;
    onDateChange: (date: Date | undefined) => void;
    onTimeSlotChange: (value: string) => void;
  }

  export interface DateTimeInfoProps {
    date: Date;
    timeSlot: string;
  }