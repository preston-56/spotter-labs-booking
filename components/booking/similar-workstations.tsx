"use client";

import { SimilarWorkstationsProps } from "@/types";
import { WorkstationOption } from "@/components/booking/workstation-option";

export function SimilarWorkstations({ booking }: SimilarWorkstationsProps) {
  // In a real-world scenario, you might fetch these dynamically based on the booking
  const similarOptions = [
    {
      id: "1",
      floor: booking.floor,
      workstation: "Workstation 3",
      hotDesk: "HD 2",
      availability: "Available tomorrow"
    },
    {
      id: "2",
      floor: "Floor 2",
      workstation: "Workstation 1",
      hotDesk: "HD 1",
      availability: "Available today"
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Similar Workstations</h2>
      <p className="text-sm text-muted-foreground">
        Other options you might like
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {similarOptions.map((option) => (
          <WorkstationOption
            key={option.id}
            floor={option.floor}
            workstation={option.workstation}
            hotDesk={option.hotDesk}
            availability={option.availability}
          />
        ))}
      </div>
    </div>
  );
}
