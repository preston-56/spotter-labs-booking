"use client"

import { UtilizationProgressProps } from "@/types";

  const UtilizationProgress = ({ utilizationPercentage }: UtilizationProgressProps) => (
    <div>
      <h3 className="mb-4 text-lg font-medium">Utilization</h3>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm">Current Utilization</span>
          <span className="text-sm font-medium">{utilizationPercentage}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-muted">
          <div
            className={`h-2 rounded-full ${
              utilizationPercentage > 80
                ? "bg-red-500"
                : utilizationPercentage > 50
                ? "bg-yellow-500"
                : "bg-green-500"
            }`}
            style={{ width: `${utilizationPercentage}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );

  export default UtilizationProgress;