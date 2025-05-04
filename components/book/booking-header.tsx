"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, Users, MapPin, Clock } from "lucide-react";
interface Props {
  showMap: boolean;
  toggleMap: () => void;
}

export function BookingHeader({ showMap, toggleMap }: Props) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex h-16 items-stretch px-6">
            <h1 className="flex items-center text-xl font-semibold">
              Workstation Booking
            </h1>
            <Separator
              orientation="vertical"
              className="ml-4 w-px bg-border"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-2 rounded-md border bg-card px-3 py-1.5 md:flex">
              <CalendarDays className="h-4 w-4 text-indigo-500" />
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">
                  Today&apos;s Bookings
                </span>
                <span className="font-medium">12</span>
              </div>
            </div>

            <div className="hidden items-center gap-2 rounded-md border bg-card px-3 py-1.5 md:flex">
              <Users className="h-4 w-4 text-indigo-500" />
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">
                  Occupancy
                </span>
                <span className="font-medium">68%</span>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="flex"
              onClick={toggleMap}
            >
              <MapPin className="mr-2 h-4 w-4 text-indigo-500" />
              {showMap ? "Hide Map" : "View Floor Map"}
            </Button>

            <Button
            size="sm"
            className="bg-black text-white"
            onClick={() => router.push("/bookings")}
          >              <Clock className="mr-2 h-4 w-4" />
              My Bookings
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}