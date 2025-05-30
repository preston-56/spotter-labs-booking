"use client";

import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, MapPin, Loader2 } from "lucide-react";
import { useQuickActions } from "@/hooks/useQuickActions";
import { FloorMap } from "@/components/booking/floor-map";
import {
  ActionButtonProps,
  QuickActionConfig,
  QuickActionsProps
} from "@/types";

export function QuickActions({ config, className }: QuickActionsProps) {
  const [showFloorMap, setShowFloorMap] = useState(false);

  const quickActionsConfig: QuickActionConfig = {
    ...config,
    onMapView: () => setShowFloorMap(true) // Custom handler to show floor map
  };

  const {
    handleAddToCalendar,
    handleInviteColleague,
    handleViewOnMap,
    isLoading
  } = useQuickActions(quickActionsConfig);

  if (showFloorMap) {
    return (
      <div className={className}>
        <Button
          variant="outline"
          onClick={() => setShowFloorMap(false)}
          className="mb-4"
        >
          ← Back to Quick Actions
        </Button>
        <FloorMap />
      </div>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <ActionButton
          icon={
            isLoading === "calendar" ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Calendar className="mr-2 h-4 w-4" />
            )
          }
          label="Add to Calendar"
          onClick={handleAddToCalendar}
          disabled={isLoading === "calendar"}
        />
        <ActionButton
          icon={
            isLoading === "invite" ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <User className="mr-2 h-4 w-4" />
            )
          }
          label="Invite Colleague"
          onClick={handleInviteColleague}
          disabled={isLoading === "invite"}
        />
        <ActionButton
          icon={
            isLoading === "map" ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <MapPin className="mr-2 h-4 w-4" />
            )
          }
          label="View Floor Map"
          onClick={handleViewOnMap}
          disabled={isLoading === "map"}
        />
      </CardContent>
    </Card>
  );
}

function ActionButton({ icon, label, onClick, disabled }: ActionButtonProps) {
  return (
    <Button
      className="w-full justify-start h-9 text-sm"
      variant="outline"
      onClick={onClick}
      disabled={disabled}
    >
      {icon} {label}
    </Button>
  );
}
