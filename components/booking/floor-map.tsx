"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  WorkstationData,
  SelectedDesk,
  initialWorkstationsData
} from "@/mocks";

export function FloorMap() {
  const [workstations, setWorkstations] = useState<WorkstationData[]>(
    initialWorkstationsData
  );
  const [selectedDesk, setSelectedDesk] = useState<SelectedDesk | null>(null);

  // Group workstations by floor
  const workstationsByFloor = workstations.reduce((acc, ws) => {
    if (!acc[ws.floor]) {
      acc[ws.floor] = [];
    }
    acc[ws.floor].push(ws);
    return acc;
  }, {} as Record<string, WorkstationData[]>);

  const floors = Object.keys(workstationsByFloor).sort();

  // Calculate summary statistics
  const totalDesks = workstations.reduce((sum, ws) => sum + ws.hotDesks, 0);
  const bookedDesks = workstations.reduce(
    (sum, ws) => sum + ws.bookedDesks.length,
    0
  );
  const availableDesks = totalDesks - bookedDesks;

  const handleDeskClick = (workstationId: string, deskIndex: number) => {
    const workstation = workstations.find((ws) => ws.id === workstationId);
    if (!workstation) return;

    const isBooked = workstation.bookedDesks.includes(deskIndex);
    const bookedBy = workstation.bookedBy[deskIndex];

    setSelectedDesk({
      workstationId,
      deskIndex,
      isBooked,
      bookedBy
    });
  };

  const handleBookDesk = () => {
    if (!selectedDesk || selectedDesk.isBooked) return;

    setWorkstations((prev) =>
      prev.map((ws) => {
        if (ws.id === selectedDesk.workstationId) {
          return {
            ...ws,
            bookedDesks: [...ws.bookedDesks, selectedDesk.deskIndex],
            bookedBy: {
              ...ws.bookedBy,
              [selectedDesk.deskIndex]: "You"
            }
          };
        }
        return ws;
      })
    );

    setSelectedDesk(null);
  };

  const handleReleaseDesk = () => {
    if (!selectedDesk || !selectedDesk.isBooked) return;

    setWorkstations((prev) =>
      prev.map((ws) => {
        if (ws.id === selectedDesk.workstationId) {
          const newBookedDesks = ws.bookedDesks.filter(
            (index) => index !== selectedDesk.deskIndex
          );
          const newBookedBy = { ...ws.bookedBy };
          delete newBookedBy[selectedDesk.deskIndex];

          return {
            ...ws,
            bookedDesks: newBookedDesks,
            bookedBy: newBookedBy
          };
        }
        return ws;
      })
    );

    setSelectedDesk(null);
  };

  return (
    <div className="space-y-6">
      {/* Summary Statistics */}
      <Card className="border-indigo-200 bg-white/50 backdrop-blur-sm dark:border-indigo-950 dark:bg-black/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">
            Desk Availability Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded bg-green-500"></div>
              <span className="text-sm">Available: {availableDesks}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded bg-red-500"></div>
              <span className="text-sm">Booked: {bookedDesks}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Total: {totalDesks}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Floor Map */}
      <Card className="mb-8 overflow-hidden border-indigo-200 bg-white/50 backdrop-blur-sm dark:border-indigo-950 dark:bg-black/20">
        <CardHeader className="border-b bg-muted/50 pb-3">
          <CardTitle className="text-lg font-medium">Floor Map</CardTitle>
          <CardDescription>
            Click on any desk to book or release it
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {floors.map((floor) => {
              const floorWorkstations = workstationsByFloor[floor];
              const floorTotalDesks = floorWorkstations.reduce(
                (sum, ws) => sum + ws.hotDesks,
                0
              );
              const floorBookedDesks = floorWorkstations.reduce(
                (sum, ws) => sum + ws.bookedDesks.length,
                0
              );

              return (
                <div key={floor} className="rounded-lg border p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-medium">{floor}</h3>
                    <Badge variant="outline" className="text-xs">
                      {floorTotalDesks - floorBookedDesks}/{floorTotalDesks}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {floorWorkstations.map((workstation) => (
                      <div
                        key={workstation.id}
                        className="rounded-md border border-dashed border-indigo-300 bg-indigo-50/50 p-3 text-center dark:border-indigo-800 dark:bg-indigo-950/30"
                      >
                        <div className="text-sm font-medium">
                          {workstation.name}
                        </div>
                        <div className="mt-2 grid grid-cols-2 gap-1">
                          {Array.from({ length: workstation.hotDesks }).map(
                            (_, hdIndex) => {
                              const isBooked =
                                workstation.bookedDesks.includes(hdIndex);
                              const bookedBy = workstation.bookedBy[hdIndex];

                              return (
                                <button
                                  key={hdIndex}
                                  onClick={() =>
                                    handleDeskClick(workstation.id, hdIndex)
                                  }
                                  className={`rounded p-1 text-xs font-medium transition-all hover:scale-105 hover:shadow-sm ${
                                    isBooked
                                      ? "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-950/50 dark:text-red-400 dark:hover:bg-red-900/50"
                                      : "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-950/50 dark:text-green-400 dark:hover:bg-green-900/50"
                                  }`}
                                  title={
                                    isBooked
                                      ? `Booked by ${bookedBy}`
                                      : "Available - Click to book"
                                  }
                                >
                                  HD {hdIndex + 1}
                                </button>
                              );
                            }
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Booking Modal/Panel */}
      {selectedDesk && (
        <Card className="border-indigo-200 bg-white/50 backdrop-blur-sm dark:border-indigo-950 dark:bg-black/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium">
              {selectedDesk.isBooked ? "Release Desk" : "Book Desk"}
            </CardTitle>
            <CardDescription>
              {(() => {
                const workstation = workstations.find(
                  (ws) => ws.id === selectedDesk.workstationId
                );
                return `${workstation?.floor} - ${
                  workstation?.name
                } - Hot Desk ${selectedDesk.deskIndex + 1}`;
              })()}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedDesk.isBooked ? (
              <div>
                <p className="text-sm text-muted-foreground mb-4">
                  This desk is currently booked by{" "}
                  <strong>{selectedDesk.bookedBy}</strong>
                </p>
                {selectedDesk.bookedBy === "You" && (
                  <Button
                    onClick={handleReleaseDesk}
                    variant="destructive"
                    size="sm"
                  >
                    Release Desk
                  </Button>
                )}
              </div>
            ) : (
              <div>
                <p className="text-sm text-muted-foreground mb-4">
                  This desk is available for booking
                </p>
                <Button onClick={handleBookDesk} size="sm">
                  Book This Desk
                </Button>
              </div>
            )}
            <Button
              onClick={() => setSelectedDesk(null)}
              variant="outline"
              size="sm"
            >
              Cancel
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
