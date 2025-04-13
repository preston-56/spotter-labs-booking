import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

export function DataFlowDiagram() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Admin User Data Flow</CardTitle>
          <CardDescription>
            How administrators interact with the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border p-4">
            <div className="flex flex-col items-center space-y-4">
              <div className="rounded-full bg-primary/10 p-4">
                <div className="text-primary">Admin User</div>
              </div>
              <div className="h-8 w-0.5 bg-border"></div>
              <div className="rounded-lg bg-muted p-4 text-center">
                <div className="font-medium">Authentication</div>
                <div className="text-sm text-muted-foreground">
                  Office 365 SSO
                </div>
              </div>
              <div className="h-8 w-0.5 bg-border"></div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-lg bg-muted p-4 text-center">
                  <div className="font-medium">Manage Clusters</div>
                  <div className="text-sm text-muted-foreground">
                    Create, Update, Delete
                  </div>
                </div>
                <div className="rounded-lg bg-muted p-4 text-center">
                  <div className="font-medium">Manage Floors</div>
                  <div className="text-sm text-muted-foreground">
                    Create, Update, Delete
                  </div>
                </div>
                <div className="rounded-lg bg-muted p-4 text-center">
                  <div className="font-medium">Manage Workstations</div>
                  <div className="text-sm text-muted-foreground">
                    Create, Update, Delete
                  </div>
                </div>
              </div>
              <div className="h-8 w-0.5 bg-border"></div>
              <div className="rounded-lg bg-muted p-4 text-center">
                <div className="font-medium">Database</div>
                <div className="text-sm text-muted-foreground">
                  Store and Retrieve Data
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Booking Process Data Flow</CardTitle>
          <CardDescription>How users book workstations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border p-4">
            <div className="flex flex-col items-center space-y-4">
              <div className="rounded-full bg-primary/10 p-4">
                <div className="text-primary">User</div>
              </div>
              <div className="h-8 w-0.5 bg-border"></div>
              <div className="rounded-lg bg-muted p-4 text-center">
                <div className="font-medium">Authentication</div>
                <div className="text-sm text-muted-foreground">
                  Office 365 SSO
                </div>
              </div>
              <div className="h-8 w-0.5 bg-border"></div>
              <div className="rounded-lg bg-muted p-4 text-center">
                <div className="font-medium">Select Cluster</div>
                <div className="text-sm text-muted-foreground">
                  Default or Choose
                </div>
              </div>
              <div className="h-8 w-0.5 bg-border"></div>
              <div className="rounded-lg bg-muted p-4 text-center">
                <div className="font-medium">Select Floor & Workstation</div>
                <div className="text-sm text-muted-foreground">
                  Based on Availability
                </div>
              </div>
              <div className="h-8 w-0.5 bg-border"></div>
              <div className="rounded-lg bg-muted p-4 text-center">
                <div className="font-medium">Select Date & Time</div>
                <div className="text-sm text-muted-foreground">
                  Booking Duration
                </div>
              </div>
              <div className="h-8 w-0.5 bg-border"></div>
              <div className="rounded-lg bg-muted p-4 text-center">
                <div className="font-medium">Confirm Booking</div>
                <div className="text-sm text-muted-foreground">
                  Submit Request
                </div>
              </div>
              <div className="h-8 w-0.5 bg-border"></div>
              <div className="rounded-lg bg-muted p-4 text-center">
                <div className="font-medium">Notification</div>
                <div className="text-sm text-muted-foreground">
                  Booking Details
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
