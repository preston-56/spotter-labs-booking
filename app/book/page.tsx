"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { BookingHeader } from "@/components/book/booking-header";
import { FloorMap } from "@/components/booking/floor-map";
import { RecentBookings } from "@/components/book/recent-bookings";
import { BookingSummary } from "@/components/book/booking-summary";
import { BookingForm } from "@/components/book/booking-form";
import { recentBookings } from "@/mocks";
import { useBookingForm } from "@/hooks/use-booking-form";

export default function BookingPage() {
  // Use custom hook for all form management and toast notifications
  const {
    bookingDetails,
    setBookingDetails,
    showMap,
    toggleMap,
    handleSubmit,
    handleReset,
    handleSaveDraft
  } = useBookingForm();


  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <BookingHeader showMap={showMap} toggleMap={toggleMap} />

      <div className="container mx-auto px-4 py-8">
        {showMap && <FloorMap />}

        <div className="grid gap-8 md:grid-cols-5">
          <Card className="md:col-span-3 md:row-span-2 border-indigo-200 bg-white/80 backdrop-blur-sm dark:border-indigo-950 dark:bg-black/20">
            <CardHeader>
              <CardTitle>Book a Workstation</CardTitle>
              <CardDescription>
                Select your cluster, floor, workstation, and hot desk to make a
                booking.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BookingForm
                bookingDetails={bookingDetails}
                setBookingDetails={setBookingDetails}
                onSubmit={handleSubmit}
              />
            </CardContent>
          </Card>

          <div className="md:col-span-2 space-y-8">
            <BookingSummary
              bookingDetails={bookingDetails}
              onReset={handleReset}
              onSaveDraft={handleSaveDraft}
            />

            <RecentBookings bookings={recentBookings} />
          </div>
        </div>
      </div>
    </div>
  );
}
