import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useBookingActions } from "@/hooks/use-booking-actions";
import { BookingActionsProps } from "@/types";

export default function BookingActions({
  bookingId,
  initialDate,
  initialTimeSlot,
  onReschedule,
  onCancel,
  size = "default"
}: BookingActionsProps) {
  const {
    isRescheduleOpen,
    isCancelOpen,
    setIsRescheduleOpen,
    setIsCancelOpen,
    newDate,
    setNewDate,
    newTimeSlot,
    setNewTimeSlot,
    timeSlots,
    handleReschedule,
    handleCancel
  } = useBookingActions(
    bookingId,
    initialDate,
    initialTimeSlot,
    onReschedule,
    onCancel
  );

  return (
    <>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size={size}
          onClick={() => setIsRescheduleOpen(true)}
        >
          Reschedule
        </Button>
        <Button
          variant="destructive"
          size={size}
          onClick={() => setIsCancelOpen(true)}
        >
          Cancel
        </Button>
      </div>

      <Dialog open={isRescheduleOpen} onOpenChange={setIsRescheduleOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reschedule Booking</DialogTitle>
            <DialogDescription>
              Choose a new date and time for your booking.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Select New Date</Label>
              <Calendar
                mode="single"
                selected={newDate}
                onSelect={setNewDate}
                disabled={(date) => date < new Date()}
              />
            </div>
            <div className="space-y-2">
              <Label>Select New Time</Label>
              <Select value={newTimeSlot} onValueChange={setNewTimeSlot}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time slot..." />
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
            <Button onClick={handleReschedule}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isCancelOpen} onOpenChange={setIsCancelOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Booking</DialogTitle>
            <DialogDescription>
              This action cannot be undone. Are you sure you want to cancel this
              booking?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            Are you sure you want to cancel this booking?
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsCancelOpen(false)}>
              Close
            </Button>
            <Button variant="destructive" onClick={handleCancel}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
