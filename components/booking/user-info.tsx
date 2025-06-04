"use client";

import { User } from "lucide-react";
import { UserInfoProps } from "@/types";

export function UserInfo({ userName, userEmail }: UserInfoProps) {
  const displayName = userName || "Unassigned";

  return (
    <div className="space-y-2">
      <div className="text-sm font-medium text-muted-foreground">Booked By</div>
      <div className="flex items-center">
        <User className="mr-2 h-4 w-4 text-indigo-500" />
        <span className="font-medium">{displayName}</span>
      </div>
      {userEmail && (
        <div className="text-xs text-muted-foreground ml-6">{userEmail}</div>
      )}
    </div>
  );
}
