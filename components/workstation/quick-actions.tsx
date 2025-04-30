import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar, Users, BarChart3 } from "lucide-react";

const QuickActions = () => (
  <Card>
    <CardHeader>
      <CardTitle>Quick Actions</CardTitle>
    </CardHeader>
    <CardContent className="space-y-2">
      <Button className="w-full justify-start" variant="outline">
        <Calendar className="mr-2 h-4 w-4" /> Book Workstation
      </Button>
      <Button className="w-full justify-start" variant="outline">
        <Users className="mr-2 h-4 w-4" /> View Team Members
      </Button>
      <Button className="w-full justify-start" variant="outline">
        <BarChart3 className="mr-2 h-4 w-4" /> View Analytics
      </Button>
    </CardContent>
  </Card>
);

export default QuickActions;
