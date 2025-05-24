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
import { useIsMobile } from "@/hooks/use-mobile";

export default function BookingPage() {
  const {
    bookingDetails,
    setBookingDetails,
    showMap,
    toggleMap,
    handleSubmit,
    handleReset,
    handleSaveDraft
  } = useBookingForm();

  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <BookingHeader showMap={showMap} toggleMap={toggleMap} />

      <div className={`container mx-auto ${isMobile ? 'px-6 py-4 max-w-full' : 'px-4 py-8 max-w-7xl'}`}>
        {showMap && (
          <div className="mb-6">
            <FloorMap />
          </div>
        )}

        {/* Conditional layout based on mobile state */}
        {isMobile ? (
          // Mobile Layout - Single column stack with significant side margins
          <div className="flex flex-col gap-3 w-full px-8">
            {/* Main Booking Form */}
            <Card className="w-full border-indigo-200 bg-white/80 backdrop-blur-sm dark:border-indigo-950 dark:bg-black/20">
              <CardHeader className="pb-3 px-3 pt-3">
                <CardTitle className="text-base">Book a Workstation</CardTitle>
                <CardDescription className="text-xs">
                  Select your cluster, floor, workstation, and hot desk.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 px-3 pb-3">
                <BookingForm
                  bookingDetails={bookingDetails}
                  setBookingDetails={setBookingDetails}
                  onSubmit={handleSubmit}
                />
              </CardContent>
            </Card>

            {/* Booking Summary */}
            <div className="w-full">
              <BookingSummary
                bookingDetails={bookingDetails}
                onReset={handleReset}
                onSaveDraft={handleSaveDraft}
              />
            </div>

            {/* Recent Bookings */}
            <div className="w-full">
              <RecentBookings
                bookings={recentBookings}
                onSelect={(booking) => {
                  const [floor, ws] = booking.location.split(",");
                  const trimmedFloor = floor.trim();
                  const workstation =
                    "Workstation " + ws.trim().replace("WS ", "");

                  setBookingDetails((prev) => ({
                    ...prev,
                    floor: trimmedFloor,
                    workstation,
                    timeSlot: booking.time
                  }));
                }}
              />
            </div>
          </div>
        ) : (
          // Desktop Layout - Grid layout
          <div className="grid gap-6 grid-cols-5">
            {/* Main Booking Form */}
            <Card className="col-span-3 border-indigo-200 bg-white/80 backdrop-blur-sm dark:border-indigo-950 dark:bg-black/20">
              <CardHeader>
                <CardTitle className="text-xl">Book a Workstation</CardTitle>
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

            {/* Sidebar */}
            <div className="col-span-2 flex flex-col gap-6">
              <BookingSummary
                bookingDetails={bookingDetails}
                onReset={handleReset}
                onSaveDraft={handleSaveDraft}
              />

              <RecentBookings
                bookings={recentBookings}
                onSelect={(booking) => {
                  const [floor, ws] = booking.location.split(",");
                  const trimmedFloor = floor.trim();
                  const workstation =
                    "Workstation " + ws.trim().replace("WS ", "");

                  setBookingDetails((prev) => ({
                    ...prev,
                    floor: trimmedFloor,
                    workstation,
                    timeSlot: booking.time
                  }));
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}