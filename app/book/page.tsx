"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
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
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-sonner";
import { useRouter } from "next/navigation";

// Mock data for clusters
const clusters = [
  { id: "01", name: "General Direction", size: 15 },
  { id: "02", name: "HR", size: 25 },
  { id: "03", name: "Comms & Fundraising", size: 15 },
  { id: "04", name: "IT & Facilities", size: 10 },
  { id: "05", name: "Finance", size: 10 },
  { id: "06", name: "Senior/MT Level Hosted Roles", size: 10 },
  { id: "07", name: "Sensitive Medical Profiles", size: 10 },
  { id: "08", name: "OCP Cell 9", size: 5 },
  { id: "09", name: "OCBA Cell 5", size: 15 },
  { id: "10", name: "OCA", size: 20 },
  { id: "11", name: "EAA", size: 5 },
  { id: "12", name: "Other Hosted Roles", size: 60 }
];

// Mock data for floors
const floors = [
  { id: "floor1", name: "Floor 1" },
  { id: "floor2", name: "Floor 2" },
  { id: "floor3", name: "Floor 3" }
];

// Mock data for workstations
const workstations = {
  floor1: [
    { id: "ws1-1", name: "Workstation 1" },
    { id: "ws1-2", name: "Workstation 2" },
    { id: "ws1-3", name: "Workstation 3" }
  ],
  floor2: [
    { id: "ws2-1", name: "Workstation 1" },
    { id: "ws2-2", name: "Workstation 2" }
  ],
  floor3: [
    { id: "ws3-1", name: "Workstation 1" },
    { id: "ws3-2", name: "Workstation 2" },
    { id: "ws3-3", name: "Workstation 3" },
    { id: "ws3-4", name: "Workstation 4" }
  ]
};

// Mock data for hot desks
const hotDesks = {
  "ws1-1": [
    { id: "hd1-1-1", name: "HD 1" },
    { id: "hd1-1-2", name: "HD 2" }
  ],
  "ws1-2": [
    { id: "hd1-2-1", name: "HD 1" },
    { id: "hd1-2-2", name: "HD 2" }
  ],
  "ws1-3": [{ id: "hd1-3-1", name: "HD 1" }],
  "ws2-1": [
    { id: "hd2-1-1", name: "HD 1" },
    { id: "hd2-1-2", name: "HD 2" },
    { id: "hd2-1-3", name: "HD 3" }
  ],
  "ws2-2": [{ id: "hd2-2-1", name: "HD 1" }],
  "ws3-1": [
    { id: "hd3-1-1", name: "HD 1" },
    { id: "hd3-1-2", name: "HD 2" }
  ],
  "ws3-2": [{ id: "hd3-2-1", name: "HD 1" }],
  "ws3-3": [
    { id: "hd3-3-1", name: "HD 1" },
    { id: "hd3-3-2", name: "HD 2" }
  ],
  "ws3-4": [{ id: "hd3-4-1", name: "HD 1" }]
};

// Time slots
const timeSlots = [
  "08:00 - 09:00",
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "12:00 - 13:00",
  "13:00 - 14:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
  "16:00 - 17:00"
];

export default function BookingPage() {
  const [cluster, setCluster] = useState("");
  const [floor, setFloor] = useState("");
  const [workstation, setWorkstation] = useState("");
  const [hotDesk, setHotDesk] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeSlot, setTimeSlot] = useState("");
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
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
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
                  <SelectTrigger id="cluster">
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

              <div className="space-y-2">
                <Label htmlFor="floor">Floor</Label>
                <Select
                  value={floor}
                  onValueChange={handleFloorChange}
                  disabled={!cluster}
                >
                  <SelectTrigger id="floor">
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
                  <SelectTrigger id="workstation">
                    <SelectValue placeholder="Select workstation" />
                  </SelectTrigger>
                  <SelectContent>
                    {floor &&
                      workstations[floor as keyof typeof workstations]?.map(
                        (ws) => (
                          <SelectItem key={ws.id} value={ws.id}>
                            {ws.name}
                          </SelectItem>
                        )
                      )}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hotDesk">Hot Desk</Label>
                <Select
                  value={hotDesk}
                  onValueChange={setHotDesk}
                  disabled={!workstation}
                >
                  <SelectTrigger id="hotDesk">
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

              <div className="space-y-2">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeSlot">Time Slot</Label>
                <Select value={timeSlot} onValueChange={setTimeSlot}>
                  <SelectTrigger id="timeSlot">
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

            <Button type="submit" className="w-full">
              Book Workstation
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
