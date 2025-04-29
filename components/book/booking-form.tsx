"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { clusters, floors, hotDesks, timeSlots, workstations } from "@/mocks/data";
import { BookingDetails } from "@/types/book";

interface BookingFormProps {
  bookingDetails: BookingDetails;
  setBookingDetails: React.Dispatch<React.SetStateAction<BookingDetails>>;
  onSubmit: (e: React.FormEvent) => void;
}

export function BookingForm({ bookingDetails, setBookingDetails, onSubmit }: BookingFormProps) {
  const handleClusterChange = (value: string) => {
    setBookingDetails(prev => ({
      ...prev,
      cluster: value,
      floor: "",
      workstation: "",
      hotDesk: ""
    }));
  };

  const handleFloorChange = (value: string) => {
    setBookingDetails(prev => ({
      ...prev,
      floor: value,
      workstation: "",
      hotDesk: ""
    }));
  };

  const handleWorkstationChange = (value: string) => {
    setBookingDetails(prev => ({
      ...prev,
      workstation: value,
      hotDesk: ""
    }));
  };

  const handleHotDeskChange = (value: string) => {
    setBookingDetails(prev => ({
      ...prev,
      hotDesk: value
    }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setBookingDetails(prev => ({
      ...prev,
      date
    }));
  };

  const handleTimeSlotChange = (value: string) => {
    setBookingDetails(prev => ({
      ...prev,
      timeSlot: value
    }));
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="cluster">Cluster</Label>
          <Select 
            value={bookingDetails.cluster} 
            onValueChange={handleClusterChange}
          >
            <SelectTrigger
              id="cluster"
              className="w-3/4 border-indigo-200 dark:border-indigo-800"
            >
              <SelectValue placeholder="Select your cluster" />
            </SelectTrigger>
            <SelectContent>
              {clusters.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name} ({c.size})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="floor">Floor</Label>
            <Select
              value={bookingDetails.floor}
              onValueChange={handleFloorChange}
              disabled={!bookingDetails.cluster}
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
              value={bookingDetails.workstation}
              onValueChange={handleWorkstationChange}
              disabled={!bookingDetails.floor}
            >
              <SelectTrigger
                id="workstation"
                className="w-2/4 border-indigo-200 dark:border-indigo-800"
              >
                <SelectValue placeholder="Select workstation" />
              </SelectTrigger>
              <SelectContent>
                {bookingDetails.floor &&
                  workstations[
                    bookingDetails.floor as keyof typeof workstations
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
            value={bookingDetails.hotDesk}
            onValueChange={handleHotDeskChange}
            disabled={!bookingDetails.workstation}
          >
            <SelectTrigger
              id="hotDesk"
              className="w-3/4 border-indigo-200 dark:border-indigo-800"
            >
              <SelectValue placeholder="Select hot desk" />
            </SelectTrigger>
            <SelectContent>
              {bookingDetails.workstation &&
                hotDesks[bookingDetails.workstation as keyof typeof hotDesks]?.map(
                  (hd) => (
                    <SelectItem key={hd.id} value={hd.id}>
                      {hd.name}
                    </SelectItem>
                  )
                )}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal border-indigo-200 dark:border-indigo-800",
                    !bookingDetails.date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-indigo-500" />
                  {bookingDetails.date ? (
                    format(bookingDetails.date, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={bookingDetails.date}
                  onSelect={handleDateChange}
                  initialFocus
                  className="rounded-md border"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="timeSlot">Time Slot</Label>
            <Select 
              value={bookingDetails.timeSlot} 
              onValueChange={handleTimeSlotChange}
            >
              <SelectTrigger
                id="timeSlot"
                className="w-2/4 border-indigo-200 dark:border-indigo-800"
              >
                <SelectValue placeholder="Select time slot" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Button type="submit" className="w-3/4 border-indigo-200">
        Book Workstation
      </Button>
    </form>
  );
}