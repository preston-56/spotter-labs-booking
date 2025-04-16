"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  CalendarIcon,
  CalendarDays,
  Users,
  MapPin,
  ArrowLeft,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-sonner";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import {
  clusters,
  floors,
  hotDesks,
  timeSlots,
  workstations
} from "@/mocks/data";
import { FloorMap } from "@/components/booking/floor-map";
import { BookingHeader } from "@/components/book/booking-header";

export default function BookingPage() {
  const [cluster, setCluster] = useState("");
  const [floor, setFloor] = useState("");
  const [workstation, setWorkstation] = useState("");
  const [hotDesk, setHotDesk] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeSlot, setTimeSlot] = useState("");
  const [showMap, setShowMap] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleClusterChange = (value: string) => {
    setCluster(value);
    setFloor("");
    setWorkstation("");
    setHotDesk("");
  };

  const handleFloorChange = (value: string) => {
    setFloor(value);
    setWorkstation("");
    setHotDesk("");
  };

  const handleWorkstationChange = (value: string) => {
    setWorkstation(value);
    setHotDesk("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!cluster || !floor || !workstation || !hotDesk || !date || !timeSlot) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    // In a real application, this would send the booking data to the server
    // For now, we'll just show a success message
    toast({
      title: "Booking Successful",
      description: `Your booking for ${format(
        date,
        "PPP"
      )} at ${timeSlot} has been confirmed.`,
      variant: "default"
    });

    // Redirect to dashboard after successful booking
    setTimeout(() => {
      router.push("/dashboard");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <BookingHeader
        showMap={showMap}
        toggleMap={() => setShowMap((prev) => !prev)}
      />

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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cluster">Cluster</Label>
                    <Select value={cluster} onValueChange={handleClusterChange}>
                      <SelectTrigger
                        id="cluster"
                        className="w-3/4 border-indigo-200 dark:border-indigo-800"
                      >
                        <SelectValue placeholder="Select your cluster" />
                      </SelectTrigger>
                      <SelectContent>
                        {clusters.map((c) => (
                          <SelectItem key={c.id} value={c.id}>
                            {c.name} ({c.size})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="floor">Floor</Label>
                      <Select
                        value={floor}
                        onValueChange={handleFloorChange}
                        disabled={!cluster}
                      >
                        <SelectTrigger
                          id="floor"
                          className="w-3/4 border-indigo-200 dark:border-indigo-800"
                        >
                          <SelectValue placeholder="Select floor" />
                        </SelectTrigger>
                        <SelectContent>
                          {floors.map((f) => (
                            <SelectItem key={f.id} value={f.id}>
                              {f.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="workstation">Workstation</Label>
                      <Select
                        value={workstation}
                        onValueChange={handleWorkstationChange}
                        disabled={!floor}
                      >
                        <SelectTrigger
                          id="workstation"
                          className="w-2/4 border-indigo-200 dark:border-indigo-800"
                        >
                          <SelectValue placeholder="Select workstation" />
                        </SelectTrigger>
                        <SelectContent>
                          {floor &&
                            workstations[
                              floor as keyof typeof workstations
                            ]?.map((ws) => (
                              <SelectItem key={ws.id} value={ws.id}>
                                {ws.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hotDesk">Hot Desk</Label>
                    <Select
                      value={hotDesk}
                      onValueChange={setHotDesk}
                      disabled={!workstation}
                    >
                      <SelectTrigger
                        id="hotDesk"
                        className="w-3/4 border-indigo-200 dark:border-indigo-800"
                      >
                        <SelectValue placeholder="Select hot desk" />
                      </SelectTrigger>
                      <SelectContent>
                        {workstation &&
                          hotDesks[workstation as keyof typeof hotDesks]?.map(
                            (hd) => (
                              <SelectItem key={hd.id} value={hd.id}>
                                {hd.name}
                              </SelectItem>
                            )
                          )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal border-indigo-200 dark:border-indigo-800",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4 text-indigo-500" />
                            {date ? (
                              format(date, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                            className="rounded-md border"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timeSlot">Time Slot</Label>
                      <Select value={timeSlot} onValueChange={setTimeSlot}>
                        <SelectTrigger
                          id="timeSlot"
                          className="w-2/4 border-indigo-200 dark:border-indigo-800"
                        >
                          <SelectValue placeholder="Select time slot" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((slot) => (
                            <SelectItem key={slot} value={slot}>
                              {slot}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-3/4 border-indigo-200 ">
                  Book Workstation
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="md:col-span-2 border-indigo-200 bg-white/80 backdrop-blur-sm dark:border-indigo-950 dark:bg-black/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium">
                Booking Summary
              </CardTitle>
              <CardDescription>Review your booking details</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-4">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-sm text-muted-foreground">
                    Cluster:
                  </span>
                  <span className="font-medium">
                    {cluster
                      ? clusters.find((c) => c.id === cluster)?.name
                      : "Not selected"}
                  </span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-sm text-muted-foreground">Floor:</span>
                  <span className="font-medium">
                    {floor
                      ? floors.find((f) => f.id === floor)?.name
                      : "Not selected"}
                  </span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-sm text-muted-foreground">
                    Workstation:
                  </span>
                  <span className="font-medium">
                    {workstation && floor
                      ? workstations[floor as keyof typeof workstations]?.find(
                          (w) => w.id === workstation
                        )?.name
                      : "Not selected"}
                  </span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-sm text-muted-foreground">
                    Hot Desk:
                  </span>
                  <span className="font-medium">
                    {hotDesk && workstation
                      ? hotDesks[workstation as keyof typeof hotDesks]?.find(
                          (h) => h.id === hotDesk
                        )?.name
                      : "Not selected"}
                  </span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-sm text-muted-foreground">Date:</span>
                  <span className="font-medium">
                    {date ? format(date, "PPP") : "Not selected"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Time Slot:
                  </span>
                  <span className="font-medium">
                    {timeSlot || "Not selected"}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <Button
                variant="outline"
                className="border-indigo-200 dark:border-indigo-800 bg-black text-white"
              >
                Reset Form
              </Button>
              <Button
                variant="outline"
                className="border-indigo-200 dark:border-indigo-800 bg-black text-white"
              >
                Save Draft
              </Button>
            </CardFooter>
          </Card>

          <Card className="md:col-span-2 border-indigo-200 bg-white/80 backdrop-blur-sm dark:border-indigo-950 dark:bg-black/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium">
                Recent Bookings
              </CardTitle>
              <CardDescription>Your last 3 bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    date: "Apr 12, 2025",
                    time: "09:00 - 10:00",
                    location: "Floor 1, WS 2"
                  },
                  {
                    date: "Apr 10, 2025",
                    time: "14:00 - 15:00",
                    location: "Floor 3, WS 1"
                  },
                  {
                    date: "Apr 8, 2025",
                    time: "11:00 - 12:00",
                    location: "Floor 2, WS 2"
                  }
                ].map((booking, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-md border border-indigo-100 bg-indigo-50/50 p-3 dark:border-indigo-900 dark:bg-indigo-950/20"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">
                        <CalendarDays className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">{booking.date}</p>
                        <p className="text-xs text-muted-foreground">
                          {booking.time}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                      {booking.location}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
