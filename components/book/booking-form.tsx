"use client";

import { Button } from "@/components/ui/button";
import { BookingFormProps } from "@/types";
import { ClusterSelection } from "@/components/book/cluster-selection";
import { WorkstationSelection } from "@/components/book/workstation-selection";
import { DateTimeSelection } from "@/components/book/date-time-selection";

export function BookingForm({
  bookingDetails,
  setBookingDetails,
  onSubmit
}: BookingFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-4">
        <ClusterSelection
          cluster={bookingDetails.cluster}
          onClusterChange={(value) => {
            setBookingDetails(prev => ({
              ...prev,
              cluster: value,
              floor: "",
              workstation: "",
              hotDesk: ""
            }));
          }}
        />

        <WorkstationSelection
          selectedValues={{
            floor: bookingDetails.floor,
            workstation: bookingDetails.workstation,
            hotDesk: bookingDetails.hotDesk
          }}
          disabledStates={{
            floor: !bookingDetails.cluster,
            workstation: !bookingDetails.floor,
            hotDesk: !bookingDetails.workstation
          }}
          onFloorChange={(value) => {
            setBookingDetails(prev => ({
              ...prev,
              floor: value,
              workstation: "",
              hotDesk: ""
            }));
          }}
          onWorkstationChange={(value) => {
            setBookingDetails(prev => ({
              ...prev,
              workstation: value,
              hotDesk: ""
            }));
          }}
          onHotDeskChange={(value) => {
            setBookingDetails(prev => ({
              ...prev,
              hotDesk: value
            }));
          }}
        />

        <DateTimeSelection
          date={bookingDetails.date}
          timeSlot={bookingDetails.timeSlot}
          onDateChange={(date) => {
            setBookingDetails(prev => ({
              ...prev,
              date
            }));
          }}
          onTimeSlotChange={(value) => {
            setBookingDetails(prev => ({
              ...prev,
              timeSlot: value
            }));
          }}
        />
      </div>

      <Button type="submit" className="w-3/4 border-indigo-200">
        Book Workstation
      </Button>
    </form>
  );
}