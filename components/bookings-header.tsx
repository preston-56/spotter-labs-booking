import { Button } from "@/components/ui/button"
import { CalendarPlus, Filter } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export function BookingsHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
      <h1 className="text-xl font-semibold">Wokstation Bookings</h1>
     <Separator orientation="vertical" className="h-6" />
      <div className="ml-auto flex items-center gap-2">
        <Button variant="outline" size="sm">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
        <Button size="sm">
          <CalendarPlus className="mr-2 h-4 w-4" />
          New Booking
        </Button>
      </div>
    </header>
  )
}
