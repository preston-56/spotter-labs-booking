"use client";

import { User } from "lucide-react";
import { UserInfoProps } from "@/types";

export function UserInfo({ userName }: UserInfoProps) {
  return (
    <div className="space-y-1">
      <div className="text-sm font-medium text-muted-foreground">
        Booked By
      </div>
      <div className="flex items-center">
        <User className="mr-2 h-4 w-4 text-indigo-500" />
        <span>{userName}</span>
      </div>
    </div>
  );
}