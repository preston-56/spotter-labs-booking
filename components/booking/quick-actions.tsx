"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, MapPin } from "lucide-react";

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <ActionButton 
          icon={<Calendar className="mr-2 h-4 w-4" />} 
          label="Add to Calendar" 
          onClick={() => {}} 
        />
        <ActionButton 
          icon={<User className="mr-2 h-4 w-4" />} 
          label="Invite Colleague" 
          onClick={() => {}} 
        />
        <ActionButton 
          icon={<MapPin className="mr-2 h-4 w-4" />} 
          label="View on Map" 
          onClick={() => {}} 
        />
      </CardContent>
    </Card>
  );
}

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

function ActionButton({ icon, label, onClick }: ActionButtonProps) {
  return (
    <Button className="w-full justify-start" variant="outline" onClick={onClick}>
      {icon} {label}
    </Button>
  );
}