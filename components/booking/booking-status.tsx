"use client";

import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

export function BookingStatus() {
  return (
    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
      <CheckCircle2 className="mr-1 h-3 w-3" /> Confirmed
    </Badge>
  );
}