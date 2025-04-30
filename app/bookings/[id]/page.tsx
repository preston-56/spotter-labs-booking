"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Building,
  User,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { format } from "date-fns";
import BookingActions from "@/components/booking/booking-actions";
import { useBookingDetails } from "@/hooks/use-booking-details";

export default function BookingDetailPage() {
  const { booking, handleReschedule, handleCancel, router } =
    useBookingDetails();
  if (!booking) {
    return (
      <div className="container mx-auto py-10 px-4">
        <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <Card className="mx-auto max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Booking Not Found</CardTitle>
            <CardDescription className="text-center">
              The booking you're looking for doesn't exist or has been removed.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center pb-6">
            <AlertCircle className="h-16 w-16 text-muted-foreground" />
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={() => router.push("/dashboard")}>
              Return to Dashboard
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Booking Details</CardTitle>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                <CheckCircle2 className="mr-1 h-3 w-3" /> Confirmed
              </Badge>
            </div>
            <CardDescription>Booking ID: {booking.id}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <div className="text-sm font-medium text-muted-foreground">
                  Date
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-indigo-500" />
                  <span>{format(booking.date, "PPP")}</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-sm font-medium text-muted-foreground">
                  Time Slot
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-indigo-500" />
                  <span>{booking.timeSlot}</span>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-1">
              <div className="text-sm font-medium text-muted-foreground">
                Location
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Building className="mr-2 h-4 w-4 text-indigo-500" />
                  <span>Cluster: {booking.cluster}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4 text-indigo-500" />
                  <span>
                    {booking.floor}, {booking.workstation}, {booking.hotDesk}
                  </span>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-1">
              <div className="text-sm font-medium text-muted-foreground">
                Booked By
              </div>
              <div className="flex items-center">
                <User className="mr-2 h-4 w-4 text-indigo-500" />
                <span>John Doe</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <BookingActions
              bookingId={booking.id}
              initialDate={booking.date}
              initialTimeSlot={booking.timeSlot}
              onReschedule={handleReschedule}
              onCancel={handleCancel}
              size="sm"
            />
          </CardFooter>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="mr-2 h-4 w-4" /> Add to Calendar
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <User className="mr-2 h-4 w-4" /> Invite Colleague
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <MapPin className="mr-2 h-4 w-4" /> View on Map
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Similar Workstations</CardTitle>
              <CardDescription>Other options you might like</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="rounded-md border p-3">
                <div className="font-medium">{booking.floor}</div>
                <div className="text-sm text-muted-foreground">
                  Workstation 3, HD 2
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  Available tomorrow
                </div>
              </div>
              <div className="rounded-md border p-3">
                <div className="font-medium">Floor 2</div>
                <div className="text-sm text-muted-foreground">
                  Workstation 1, HD 1
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  Available today
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
