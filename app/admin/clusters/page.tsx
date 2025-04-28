'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Building, Plus, Users } from "lucide-react"
import { clusterUtilization } from "@/mocks/data"
import { toUrlFriendly } from "@/utils/url-utils"
import { useClusters } from "@/hooks/use-clusters"
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ClustersPage() {
  const { clusters, addCluster } = useClusters()
  const router = useRouter()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newClusterName, setNewClusterName] = useState("")
  
  // Replace this with the actual admin check logic (e.g., fetching user info or checking cookies)
  const isAdmin = true; // check if the user is an admin

  // If the user is not an admin, redirect them to the forbidden page
  if (!isAdmin) {
    router.push("/forbidden");
    return null; // Prevents rendering until redirect happens
  }

  const handleAddCluster = () => {
    if (newClusterName.trim()) {
      addCluster();  // This will use the newClusterName state from within the hook
      setNewClusterName("");
      setIsDialogOpen(false);
    }
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="ghost" onClick={() => router.push("/admin")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Button>
        </div>
        <h1 className="text-2xl font-bold">Clusters</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> New Cluster
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {clusterUtilization.map((cluster) => {
          const utilizationPercentage = Math.round((cluster.booked / cluster.total) * 100)

          return (
            <Card
              key={cluster.name}
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => router.push(`/admin/clusters/${toUrlFriendly(cluster.name)}`)}
              >
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between">
                  <span className="truncate">{cluster.name}</span>
                  <span
                    className={`text-sm ${
                      utilizationPercentage > 80
                        ? "text-red-500"
                        : utilizationPercentage > 50
                          ? "text-yellow-500"
                          : "text-green-500"
                    }`}
                  >
                    {utilizationPercentage}%
                  </span>
                </CardTitle>
                <CardDescription>
                  {cluster.booked} of {cluster.total} workstations booked
                </CardDescription>
              </CardHeader>
              <CardContent>
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

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <Building className="mr-1 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{cluster.total} workstations</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{Math.floor(cluster.total * 0.8)} capacity</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Add Cluster Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Cluster</DialogTitle>
            <DialogDescription>
              Enter a name for the new cluster
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="clusterName">Cluster Name</Label>
              <Input
                id="clusterName"
                value={newClusterName}
                onChange={(e) => setNewClusterName(e.target.value)}
                placeholder="e.g., Cluster A"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={() => setIsDialogOpen(false)} variant="outline">Cancel</Button>
            <Button onClick={handleAddCluster} disabled={!newClusterName.trim()}>
              Add Cluster
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}