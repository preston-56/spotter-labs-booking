"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { floors, workstations, hotDesks } from "@/mocks";
import { WorkstationSelectionProps } from "@/types";

export function WorkstationSelection({
  selectedValues,
  disabledStates,
  onFloorChange,
  onWorkstationChange,
  onHotDeskChange
}: WorkstationSelectionProps) {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="floor">Floor</Label>
          <Select
            value={selectedValues.floor}
            onValueChange={onFloorChange}
            disabled={disabledStates.floor}
          >
            <SelectTrigger
              id="floor"
              className="w-3/4 border-indigo-200 dark:border-indigo-800"
            >
              <SelectValue placeholder="Select floor" />
            </SelectTrigger>
            <SelectContent>
              {floors.map((f) => (
                <SelectItem key={f.id} value={f.id}>
                  {f.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="workstation">Workstation</Label>
          <Select
            value={selectedValues.workstation}
            onValueChange={onWorkstationChange}
            disabled={disabledStates.workstation}
          >
            <SelectTrigger
              id="workstation"
              className="w-2/4 border-indigo-200 dark:border-indigo-800"
            >
              <SelectValue placeholder="Select workstation" />
            </SelectTrigger>
            <SelectContent>
              {selectedValues.floor &&
                workstations[
                  selectedValues.floor as keyof typeof workstations
                ]?.map((ws) => (
                  <SelectItem key={ws.id} value={ws.id}>
                    {ws.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="hotDesk">Hot Desk</Label>
        <Select
          value={selectedValues.hotDesk}
          onValueChange={onHotDeskChange}
          disabled={disabledStates.hotDesk}
        >
          <SelectTrigger
            id="hotDesk"
            className="w-3/4 border-indigo-200 dark:border-indigo-800"
          >
            <SelectValue placeholder="Select hot desk" />
          </SelectTrigger>
          <SelectContent>
            {selectedValues.workstation &&
              hotDesks[
                selectedValues.workstation as keyof typeof hotDesks
              ]?.map((hd) => (
                <SelectItem key={hd.id} value={hd.id}>
                  {hd.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
