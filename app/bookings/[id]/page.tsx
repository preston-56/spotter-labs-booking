"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useBookingDetails } from "@/hooks/use-booking-details";
import { BookingNotFound } from "@/components/booking/booking-not-found";
import { BookingInfo } from "@/components/booking/booking-info";
import { QuickActions } from "@/components/booking/quick-actions";
import { SimilarWorkstations } from "@/components/booking/similar-workstations";

export default function BookingDetailPage() {
  const { booking, handleReschedule, handleCancel, router } = useBookingDetails();

  if (!booking) {
    return (
      <div className="container mx-auto py-10 px-4">
        <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <BookingNotFound onReturn={() => router.push("/dashboard")} />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <div className="grid gap-6 md:grid-cols-3">
        <BookingInfo
          booking={booking}
          onReschedule={handleReschedule}
          onCancel={handleCancel}
        />

        <div className="space-y-6">
          <QuickActions />
          <SimilarWorkstations booking={booking} />
        </div>
      </div>
    </div>
  );
}