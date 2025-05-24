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

  const isMobile = useIsMobile();

  // Shared card styling
  const cardClassName =
    "w-full border-indigo-200 bg-white/80 backdrop-blur-sm dark:border-indigo-950 dark:bg-black/20";
  const mobileCardClassName = `${cardClassName} max-w-md`;

  return (
    <div
      className={`container mx-auto ${isMobile ? "px-2 py-4" : "px-4 py-8"}`}
    >
      {/* Page header with toggle for Floor Map */}
      <BookingHeader showMap={showMap} toggleMap={toggleMap} />

      <div
        className={`container mx-auto ${isMobile ? "px-2 py-4" : "px-4 py-8"}`}
      >
        {/* Floor Map - Responsive based on device */}
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

        {/* Layout switches between mobile and desktop views */}
        {isMobile ? (
          // Mobile Layout: Stack vertically and center
          <div className="flex flex-col gap-4 px-6">
            {/* Booking form card */}
            <Card className="w-full max-w-md self-center border-indigo-200 bg-white/80 backdrop-blur-sm dark:border-indigo-950 dark:bg-black/20">
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
            <div className="w-full max-w-md self-center">
              <BookingSummary
                bookingDetails={bookingDetails}
                onReset={handleReset}
                onSaveDraft={handleSaveDraft}
              />
            </div>

            {/* Recent Bookings */}
            <div className="w-full max-w-md self-center">
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
          // Desktop Layout: Grid-based
          <div className="grid gap-8 md:grid-cols-5">
            {/* Booking Form */}
            <Card className="md:col-span-3 md:row-span-2 w-full border-indigo-200 bg-white/80 backdrop-blur-sm dark:border-indigo-950 dark:bg-black/20">
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
              <Card className="w-full border-indigo-200 bg-white/80 backdrop-blur-sm dark:border-indigo-950 dark:bg-black/20">
                <CardContent>
                  <BookingSummary
                    bookingDetails={bookingDetails}
                    onReset={handleReset}
                    onSaveDraft={handleSaveDraft}
                  />
                </CardContent>
              </Card>

              {/* Recent Bookings */}
              <Card className="w-full border-indigo-200 bg-white/80 backdrop-blur-sm dark:border-indigo-950 dark:bg-black/20">
                <CardContent>
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
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
