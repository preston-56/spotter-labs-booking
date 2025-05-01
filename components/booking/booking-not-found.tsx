"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface BookingNotFoundProps {
  onReturn: () => void;
}

export function BookingNotFound({ onReturn }: BookingNotFoundProps) {
  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle className="text-center">Booking Not Found</CardTitle>
        <CardDescription className="text-center">
          The booking you're looking for doesn't exist or has been removed.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center pb-6">
        <AlertCircle className="h-16 w-16 text-muted-foreground" />
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={onReturn}>
          Return to Dashboard
        </Button>
      </CardFooter>
    </Card>
  );
}