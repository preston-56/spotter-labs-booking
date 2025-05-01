"use client";

import React, { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface AddFormCardProps {
  title: string;
  description?: string;
  onSubmit: () => void;
  submitText: string;
  isDisabled?: boolean;
  children: ReactNode;
}

export default function AddFormCard({
  title,
  description,
  onSubmit,
  submitText,
  isDisabled = false,
  children
}: AddFormCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {children}
          <Button 
            onClick={onSubmit} 
            className="mt-4 w-full"
            disabled={isDisabled}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            {submitText}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}