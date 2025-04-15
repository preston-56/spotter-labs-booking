import { BookingsCalendarView } from "@/components/bookings-calendar-view"
import { BookingsHeader } from "@/components/bookings-header"

export default function BookingsPage() {
  return (
     
        <div className="flex flex-col h-full">
          <BookingsHeader />
          <BookingsCalendarView />
        </div>
  )
}
