import { BookingsCalendarView } from "@/components/booking/bookings-calendar-view"
import { BookingsHeader } from "@/components/booking/bookings-header"

export default function BookingsPage() {
  return (
     
        <div className="flex flex-col h-full">
          <BookingsHeader />
          <BookingsCalendarView />
        </div>
  )
}
