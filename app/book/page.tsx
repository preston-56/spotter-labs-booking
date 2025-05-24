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
import { RecentBookingSlim } from "@/types";

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

  // Shared card styling
  const cardClassName =
    "w-full border-indigo-200 bg-white/80 backdrop-blur-sm dark:border-indigo-950 dark:bg-black/20";
  const mobileCardClassName = `${cardClassName} max-w-md`;

  // Handler for selecting recent bookings
  const handleRecentBookingSelect = (booking: RecentBookingSlim) => {
    const [floor, ws] = booking.location.split(",");
    const trimmedFloor = floor.trim();
    const workstation = "Workstation " + ws.trim().replace("WS ", "");
    setBookingDetails((prev) => ({
      ...prev,
      floor: trimmedFloor,
      workstation,
      timeSlot: booking.time
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <BookingHeader showMap={showMap} toggleMap={toggleMap} />

      <div
        className={`container mx-auto ${isMobile ? "px-2 py-4" : "px-4 py-8"}`}
      >
        {/* Floor Map */}
        {showMap && (
          <div className={isMobile ? "flex justify-center px-6 mb-4" : "mb-8"}>
            <Card className={isMobile ? mobileCardClassName : cardClassName}>
              <CardHeader className={isMobile ? "pb-2 pt-3 px-3" : ""}>
                <CardTitle className={isMobile ? "text-base" : ""}>
                  Floor Map
                </CardTitle>
                <CardDescription className={isMobile ? "text-xs" : ""}>
                  Visual map of workstations
                </CardDescription>
              </CardHeader>
              <CardContent className={isMobile ? "pt-0 px-3 pb-3" : ""}>
                <FloorMap />
              </CardContent>
            </Card>
          </div>
        )}

        {isMobile ? (
          // Mobile Layout: Centered stack
          <div className="flex flex-col items-center gap-4 px-6">
            {/* Booking Form */}
            <Card className={mobileCardClassName}>
              <CardHeader className="pb-3 px-3 pt-3">
                <CardTitle className="text-base">Book a Workstation</CardTitle>
                <CardDescription className="text-xs">
                  Select your cluster, floor, workstation, and hot desk to make
                  a booking.
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
            <div className="w-full max-w-md">
              <BookingSummary
                bookingDetails={bookingDetails}
                onReset={handleReset}
                onSaveDraft={handleSaveDraft}
              />
            </div>

            {/* Recent Bookings */}
            <div className="w-full max-w-md">
              <RecentBookings
                bookings={recentBookings}
                onSelect={handleRecentBookingSelect}
              />
            </div>
          </div>
        ) : (
          // Desktop Layout: Grid
          <div className="grid gap-8 md:grid-cols-5">
            {/* Booking Form */}
            <Card className={`${cardClassName} md:col-span-3 md:row-span-2`}>
              <CardHeader>
                <CardTitle>Book a Workstation</CardTitle>
                <CardDescription>
                  Select your cluster, floor, workstation, and hot desk to make
                  a booking.
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
              {/* Booking Summary */}
              <Card className={cardClassName}>
                <CardContent>
                  <BookingSummary
                    bookingDetails={bookingDetails}
                    onReset={handleReset}
                    onSaveDraft={handleSaveDraft}
                  />
                </CardContent>
              </Card>

              {/* Recent Bookings */}
              <Card className={cardClassName}>
                <CardContent>
                  <RecentBookings
                    bookings={recentBookings}
                    onSelect={handleRecentBookingSelect}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
