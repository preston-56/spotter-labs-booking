"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle, Trash2 } from "lucide-react"
import { useClusters } from "@/hooks/use-clusters"
import { useFloors } from "@/hooks/use-floors"
import { useWorkstations } from "@/hooks/use-workstations"
import { useUsers } from "@/hooks/use-users"

export default function AdminPage() {
  const {
    clusters,
    newClusterName,
    setNewClusterName,
    addCluster,
    deleteCluster,
  } = useClusters()

  const {
    floors,
    newFloorName,
    setNewFloorName,
    addFloor,
    deleteFloor,
  } = useFloors()

  const {
    workstations,
    newWorkstationName,
    setNewWorkstationName,
    newWorkstationFloor,
    setNewWorkstationFloor,
    newWorkstationHotDesks,
    setNewWorkstationHotDesks,
    addWorkstation,
    deleteWorkstation,
  } = useWorkstations()

  const {
    users,
    newUserName,
    setNewUserName,
    newUserEmail,
    setNewUserEmail,
    newUserCluster,
    setNewUserCluster,
    addUser,
    deleteUser,
  } = useUsers()

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <Tabs defaultValue="clusters" className="space-y-6">
      <TabsList className="grid grid-cols-4 w-full max-w-md mx-auto">
          <TabsTrigger value="clusters">Clusters</TabsTrigger>
          <TabsTrigger value="floors">Floors</TabsTrigger>
          <TabsTrigger value="workstations">Workstations</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        {/* Clusters Tab */}
        <TabsContent value="clusters" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add New Cluster</CardTitle>
              <CardDescription>Create a new cluster</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Label htmlFor="clusterName">Cluster Name</Label>
                <Input
                  id="clusterName"
                  value={newClusterName}
                  onChange={(e) => setNewClusterName(e.target.value)}
                  placeholder="e.g., Cluster A"
                />
                <Button onClick={addCluster} className="mt-4 w-full">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Cluster
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Manage Clusters</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clusters.map((cluster) => (
                    <TableRow key={cluster.id}>
                      <TableCell>{cluster.id}</TableCell>
                      <TableCell>{cluster.name}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          onClick={() => deleteCluster(cluster.id)}
                          aria-label={`Delete ${cluster.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Floors Tab */}
        <TabsContent value="floors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add New Floor</CardTitle>
              <CardDescription>Create a new floor for workstations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="floorName">Floor Name</Label>
                  <Input
                    id="floorName"
                    value={newFloorName}
                    onChange={(e) => setNewFloorName(e.target.value)}
                    placeholder="e.g., Floor 4"
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={addFloor} className="w-full" disabled={!newFloorName}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Floor
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Manage Floors</CardTitle>
              <CardDescription>View and manage existing floors</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {floors.map((floor) => (
                    <TableRow key={floor.id}>
                      <TableCell>{floor.id}</TableCell>
                      <TableCell>{floor.name}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => deleteFloor(floor.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Workstations Tab */}
        <TabsContent value="workstations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add New Workstation</CardTitle>
              <CardDescription>Create a new workstation with hot desks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="space-y-2">
                  <Label htmlFor="workstationFloor">Floor</Label>
                  <Select value={newWorkstationFloor} onValueChange={setNewWorkstationFloor}>
                    <SelectTrigger id="workstationFloor">
                      <SelectValue placeholder="Select floor" />
                    </SelectTrigger>
                    <SelectContent>
                      {floors.map((floor) => (
                        <SelectItem key={floor.id} value={floor.name}>
                          {floor.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workstationName">Workstation Name</Label>
                  <Input
                    id="workstationName"
                    value={newWorkstationName}
                    onChange={(e) => setNewWorkstationName(e.target.value)}
                    placeholder="e.g., Workstation 1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hotDesks">Number of Hot Desks</Label>
                  <Input
                    id="hotDesks"
                    type="number"
                    value={newWorkstationHotDesks}
                    onChange={(e) => setNewWorkstationHotDesks(parseInt(e.target.value) || 0 )}
                    placeholder="e.g., 2"
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={addWorkstation} className="w-full" disabled={!newWorkstationName || newWorkstationHotDesks <= 0}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Workstation
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Manage Workstations</CardTitle>
              <CardDescription>View and manage existing workstations</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Floor</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Hot Desks</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {workstations.map((workstation) => (
                    <TableRow key={workstation.id}>
                      <TableCell>{workstation.id}</TableCell>
                      <TableCell>{workstation.floor}</TableCell>
                      <TableCell>{workstation.name}</TableCell>
                      <TableCell>{workstation.hotDesks}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          onClick={() => deleteWorkstation(workstation.id)}
                          aria-label={`Delete ${workstation.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add New User</CardTitle>
              <CardDescription>Create a new user</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="userName">User Name</Label>
                  <Input
                    id="userName"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    placeholder="e.g., John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="userEmail">User Email</Label>
                  <Input
                    id="userEmail"
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    placeholder="e.g., john@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="userCluster">Cluster</Label>
                  <Select value={newUserCluster} onValueChange={setNewUserCluster}>
                    <SelectTrigger id="userCluster">
                      <SelectValue placeholder="Select cluster" />
                    </SelectTrigger>
                    <SelectContent>
                      {clusters.map((cluster) => (
                        <SelectItem key={cluster.id} value={cluster.name}>
                          {cluster.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button onClick={addUser} className="w-full" disabled={!newUserName || !newUserEmail || !newUserCluster}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add User
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Manage Users</CardTitle>
              <CardDescription>View and manage users</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Cluster</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.cluster}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          onClick={() => deleteUser(user.id)}
                          aria-label={`Delete ${user.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
