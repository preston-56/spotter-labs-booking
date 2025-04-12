"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-sonner"
import { PlusCircle, Trash2 } from "lucide-react"

// Mock data for clusters
const initialClusters = [
  { id: "01", name: "General Direction", size: 15 },
  { id: "02", name: "HR", size: 25 },
  { id: "03", name: "Comms & Fundraising", size: 15 },
  { id: "04", name: "IT & Facilities", size: 10 },
  { id: "05", name: "Finance", size: 10 },
]

// Mock data for floors
const initialFloors = [
  { id: "floor1", name: "Floor 1" },
  { id: "floor2", name: "Floor 2" },
  { id: "floor3", name: "Floor 3" },
]

// Mock data for workstations
const initialWorkstations = [
  { id: "ws1", floor: "Floor 1", name: "Workstation 1", hotDesks: 5 },
  { id: "ws2", floor: "Floor 1", name: "Workstation 2", hotDesks: 5 },
  { id: "ws3", floor: "Floor 1", name: "Workstation 3", hotDesks: 4 },
  { id: "ws4", floor: "Floor 2", name: "Workstation 1", hotDesks: 4 },
  { id: "ws5", floor: "Floor 2", name: "Workstation 2", hotDesks: 3 },
  { id: "ws6", floor: "Floor 3", name: "Workstation 1", hotDesks: 6 },
  { id: "ws7", floor: "Floor 3", name: "Workstation 2", hotDesks: 7 },
  { id: "ws8", floor: "Floor 3", name: "Workstation 3", hotDesks: 5 },
  { id: "ws9", floor: "Floor 3", name: "Workstation 4", hotDesks: 8 },
]

// Mock data for users
const initialUsers = [
  { id: "user1", name: "Preston Osoro", email: "preston.osoro@spotter.org", cluster: "HR" },
  { id: "user2", name: "Jane Smith", email: "jane.smith@spotter.org", cluster: "Finance" },
  { id: "user3", name: "Bob Johnson", email: "bob.johnson@spotter.org", cluster: "IT & Facilities" },
  { id: "user4", name: "Alice Brown", email: "alice.brown@spotter.org", cluster: "Comms & Fundraising" },
  { id: "user5", name: "Charlie Wilson", email: "charlie.wilson@spotter.org", cluster: "General Direction" },
]

export default function AdminPage() {
  const [clusters, setClusters] = useState(initialClusters)
  const [floors, setFloors] = useState(initialFloors)
  const [workstations, setWorkstations] = useState(initialWorkstations)
  const [users, setUsers] = useState(initialUsers)

  const [newClusterName, setNewClusterName] = useState("")
  const [newClusterSize, setNewClusterSize] = useState("")

  const [newFloorName, setNewFloorName] = useState("")

  const [newWorkstationFloor, setNewWorkstationFloor] = useState("")
  const [newWorkstationName, setNewWorkstationName] = useState("")
  const [newWorkstationHotDesks, setNewWorkstationHotDesks] = useState("")

  const [newUserName, setNewUserName] = useState("")
  const [newUserEmail, setNewUserEmail] = useState("")
  const [newUserCluster, setNewUserCluster] = useState("")

  const { toast } = useToast()

  // Add new cluster
  const handleAddCluster = () => {
    if (!newClusterName || !newClusterSize) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    const newCluster = {
      id: `cluster${clusters.length + 1}`,
      name: newClusterName,
      size: Number.parseInt(newClusterSize),
    }

    setClusters([...clusters, newCluster])
    setNewClusterName("")
    setNewClusterSize("")

    toast({
      title: "Success",
      description: "Cluster added successfully",
    })
  }

  // Add new floor
  const handleAddFloor = () => {
    if (!newFloorName) {
      toast({
        title: "Error",
        description: "Please enter a floor name",
        variant: "destructive",
      })
      return
    }

    const newFloor = {
      id: `floor${floors.length + 1}`,
      name: newFloorName,
    }

    setFloors([...floors, newFloor])
    setNewFloorName("")

    toast({
      title: "Success",
      description: "Floor added successfully",
    })
  }

  // Add new workstation
  const handleAddWorkstation = () => {
    if (!newWorkstationFloor || !newWorkstationName || !newWorkstationHotDesks) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    const newWorkstation = {
      id: `ws${workstations.length + 1}`,
      floor: newWorkstationFloor,
      name: newWorkstationName,
      hotDesks: Number.parseInt(newWorkstationHotDesks),
    }

    setWorkstations([...workstations, newWorkstation])
    setNewWorkstationName("")
    setNewWorkstationHotDesks("")

    toast({
      title: "Success",
      description: "Workstation added successfully",
    })
  }

  // Add new user
  const handleAddUser = () => {
    if (!newUserName || !newUserEmail || !newUserCluster) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    const newUser = {
      id: `user${users.length + 1}`,
      name: newUserName,
      email: newUserEmail,
      cluster: newUserCluster,
    }

    setUsers([...users, newUser])
    setNewUserName("")
    setNewUserEmail("")
    setNewUserCluster("")

    toast({
      title: "Success",
      description: "User added successfully",
    })
  }

  // Delete cluster
  const handleDeleteCluster = (id: string) => {
    setClusters(clusters.filter((cluster) => cluster.id !== id))
    toast({
      title: "Success",
      description: "Cluster deleted successfully",
    })
  }

  // Delete floor
  const handleDeleteFloor = (id: string) => {
    setFloors(floors.filter((floor) => floor.id !== id))
    toast({
      title: "Success",
      description: "Floor deleted successfully",
    })
  }

  // Delete workstation
  const handleDeleteWorkstation = (id: string) => {
    setWorkstations(workstations.filter((workstation) => workstation.id !== id))
    toast({
      title: "Success",
      description: "Workstation deleted successfully",
    })
  }

  // Delete user
  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id))
    toast({
      title: "Success",
      description: "User deleted successfully",
    })
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <Tabs defaultValue="clusters" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-md">
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
              <CardDescription>Create a new cluster for organizing staff</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="clusterName">Cluster Name</Label>
                  <Input
                    id="clusterName"
                    value={newClusterName}
                    onChange={(e) => setNewClusterName(e.target.value)}
                    placeholder="e.g., Finance"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clusterSize">Staff Size</Label>
                  <Input
                    id="clusterSize"
                    type="number"
                    value={newClusterSize}
                    onChange={(e) => setNewClusterSize(e.target.value)}
                    placeholder="e.g., 10"
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={handleAddCluster} className="w-full">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Cluster
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Manage Clusters</CardTitle>
              <CardDescription>View and manage existing clusters</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Staff Size</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clusters.map((cluster) => (
                    <TableRow key={cluster.id}>
                      <TableCell>{cluster.id}</TableCell>
                      <TableCell>{cluster.name}</TableCell>
                      <TableCell>{cluster.size}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteCluster(cluster.id)}>
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
                  <Button onClick={handleAddFloor} className="w-full">
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
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteFloor(floor.id)}>
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
                    onChange={(e) => setNewWorkstationHotDesks(e.target.value)}
                    placeholder="e.g., 2"
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={handleAddWorkstation} className="w-full">
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
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteWorkstation(workstation.id)}>
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
              <CardDescription>Create a new user account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="space-y-2">
                  <Label htmlFor="userName">Name</Label>
                  <Input
                    id="userName"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    placeholder="e.g., Preston Osoro"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="userEmail">Email</Label>
                  <Input
                    id="userEmail"
                    type="email"
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    placeholder="e.g., preston.osoro@spotter.org"
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
                  <Button onClick={handleAddUser} className="w-full">
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
              <CardDescription>View and manage existing users</CardDescription>
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
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteUser(user.id)}>
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
