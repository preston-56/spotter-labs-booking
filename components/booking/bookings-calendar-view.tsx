"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, CalendarIcon, ChevronRight } from "lucide-react"
import { mockBookings } from "@/mocks/data"
import { useRouter } from "next/navigation"

export function BookingsCalendarView() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const router = useRouter()

  // Function to check if a date has bookings
  const hasBooking = (date: Date) => {
    return mockBookings.some(
      (booking) =>
        booking.date.getDate() === date.getDate() &&
        booking.date.getMonth() === date.getMonth() &&
        booking.date.getFullYear() === date.getFullYear(),
    )
  }

  // Get bookings for the selected date
  const getBookingsForDate = (date: Date | undefined) => {
    if (!date) return []

    return mockBookings.filter(
      (booking) =>
        booking.date.getDate() === date.getDate() &&
        booking.date.getMonth() === date.getMonth() &&
        booking.date.getFullYear() === date.getFullYear(),
    )
  }

  // Function to handle booking click
  const handleBookingClick = (bookingId:string | number) => {
    router.push(`/bookings/${bookingId}`)
  }

  const selectedDateBookings = getBookingsForDate(selectedDate)

  return (
    <div className="flex flex-1 flex-col md:flex-row gap-6 p-6 overflow-auto">
      <div className="md:w-[350px]">
        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>View and manage your bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
              modifiers={{
                booked: (date) => hasBooking(date),
              }}
              modifiersStyles={{
                booked: {
                  fontWeight: "bold",
                  backgroundColor: "rgba(79, 70, 229, 0.1)",
                  borderRadius: "50%",
                  color: "#4F46E5",
                },
              }}
            />
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <div className="flex items-center">
                <div className="mr-1 h-3 w-3 rounded-full bg-indigo-100 border border-indigo-400"></div>
                <span>Dates with bookings</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex-1">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>
              {selectedDate ? (
                <>
                  Bookings for{" "}
                  {selectedDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </>
              ) : (
                <>Select a date to view bookings</>
              )}
            </CardTitle>
            <CardDescription>
              {selectedDateBookings.length} booking{selectedDateBookings.length !== 1 ? "s" : ""} scheduled
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedDateBookings.length > 0 ? (
              <div className="space-y-4">
                {selectedDateBookings.map((booking) => (
                  <Card
                    key={booking.id}
                    className="overflow-hidden transition-all hover:shadow-md cursor-pointer group"
                    onClick={() => handleBookingClick(booking.id)}
                  >
                    <div className="bg-indigo-500 h-2"></div>
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-medium">{booking.cluster}</h3>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <Clock className="mr-1 h-4 w-4" />
                            {booking.timeSlot}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <MapPin className="mr-1 h-4 w-4" />
                            {booking.floor}, {booking.workstation}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 items-center">
                          <div>
                            <Badge variant="outline" className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100">
                              {booking.hotDesk}
                            </Badge>
                            <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100 ml-2">
                              Confirmed
                            </Badge>
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[300px] text-center">
                <div className="rounded-full bg-muted p-6">
                  <CalendarIcon className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-medium">No bookings found</h3>
                <p className="mt-2 text-sm text-muted-foreground max-w-sm">
                  There are no bookings scheduled for this date. Select a different date or create a new booking.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}