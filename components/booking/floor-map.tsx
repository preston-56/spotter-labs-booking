"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

export function FloorMap() {
  return (
    <Card className="mb-8 overflow-hidden border-indigo-200 bg-white/50 backdrop-blur-sm dark:border-indigo-950 dark:bg-black/20">
      <CardHeader className="border-b bg-muted/50 pb-3">
        <CardTitle className="text-lg font-medium">Floor Map</CardTitle>
        <CardDescription>
          View available workstations and hot desks
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[1, 2, 3].map((floor) => (
            <div key={floor} className="rounded-lg border p-4">
              <h3 className="mb-3 font-medium">Floor {floor}</h3>
              <div className="grid grid-cols-2 gap-3">
                {Array.from({
                  length: floor === 2 ? 2 : floor === 3 ? 4 : 3
                }).map((_, wsIndex) => (
                  <div
                    key={wsIndex}
                    className="rounded-md border border-dashed border-indigo-300 bg-indigo-50/50 p-3 text-center dark:border-indigo-800 dark:bg-indigo-950/30"
                  >
                    <div className="text-sm font-medium">WS {wsIndex + 1}</div>
                    <div className="mt-2 grid grid-cols-2 gap-1">
                      {Array.from({ length: wsIndex === 2 ? 1 : 2 }).map(
                        (_, hdIndex) => (
                          <div
                            key={hdIndex}
                            className={`rounded ${
                              hdIndex === 0 && wsIndex === 0
                                ? "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400"
                                : "bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400"
                            } p-1 text-xs font-medium`}
                          >
                            HD {hdIndex + 1}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
