"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Booking, BookingUpdateDetails } from "@/types/booking";

interface BookingItemProps {
  booking: Booking;
  onReschedule: (bookingId: string, newDetails: BookingUpdateDetails) => void;
  onCancel: (bookingId: string) => void;
}

export function BookingItem({
  booking,
  onReschedule,
  onCancel
}: BookingItemProps) {
  const [isRescheduleOpen, setIsRescheduleOpen] = useState<boolean>(false);
  const [isCancelOpen, setIsCancelOpen] = useState<boolean>(false);
  const [newDate, setNewDate] = useState<Date | undefined>(booking.date);
  const [newTimeSlot, setNewTimeSlot] = useState<string>(booking.timeSlot);

  const handleReschedule = () => {
    if (newDate) {
      onReschedule(booking.id, { date: newDate, timeSlot: newTimeSlot });
      setIsRescheduleOpen(false);
    }
  };

  const handleCancel = () => {
    onCancel(booking.id);
    setIsCancelOpen(false);
  };

  const timeSlots = [
    "8:00 AM - 10:00 AM",
    "10:00 AM - 12:00 PM",
    "12:00 PM - 2:00 PM",
    "2:00 PM - 4:00 PM",
    "4:00 PM - 6:00 PM"
  ];

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg">
      <div className="space-y-1">
        <div className="font-medium">{format(booking.date, "PPP")}</div>
        <div className="text-sm text-muted-foreground">{booking.timeSlot}</div>
      </div>
      <div className="space-y-1 mt-2 md:mt-0">
        <div className="font-medium">{booking.cluster}</div>
        <div className="text-sm text-muted-foreground">
          {booking.floor} - {booking.workstation} - {booking.hotDesk}
        </div>
      </div>
      <div className="flex gap-2 mt-4 md:mt-0">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsRescheduleOpen(true)}
        >
          Reschedule
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => setIsCancelOpen(true)}
        >
          Cancel
        </Button>
      </div>

      {/* Reschedule Dialog */}
      <Dialog open={isRescheduleOpen} onOpenChange={setIsRescheduleOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reschedule Booking</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Select New Date</Label>
              <Calendar
                mode="single"
                selected={newDate}
                onSelect={setNewDate}
                className="mx-auto"
                disabled={(date) => date < new Date()}
              />
            </div>
            <div className="space-y-2">
              <Label>Select New Time</Label>
              <Select value={newTimeSlot} onValueChange={setNewTimeSlot}>
                <SelectTrigger className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
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
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsRescheduleOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleReschedule}>Confirm Reschedule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Dialog */}
      <Dialog open={isCancelOpen} onOpenChange={setIsCancelOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Booking</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to cancel this booking?</p>
            <p className="text-sm text-muted-foreground mt-2">
              {format(booking.date, "PPP")} | {booking.timeSlot} |{" "}
              {booking.cluster}
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCancelOpen(false)}>
              Keep Booking
            </Button>
            <Button variant="destructive" onClick={handleCancel}>
              Confirm Cancellation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
