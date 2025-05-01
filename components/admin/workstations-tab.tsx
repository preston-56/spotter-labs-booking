"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { PlusCircle, Trash2 } from "lucide-react";
import { useWorkstations } from "@/hooks/use-workstations";
import { useFloors } from "@/hooks/use-floors";
import { Workstation } from "@/types";

export default function WorkstationsTab() {
  const { floors } = useFloors();
  const {
    workstations,
    newWorkstationName,
    setNewWorkstationName,
    newWorkstationFloor,
    setNewWorkstationFloor,
    newWorkstationHotDesks,
    setNewWorkstationHotDesks,
    addWorkstation,
    deleteWorkstation
  } = useWorkstations();

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Add New Workstation</CardTitle>
          <CardDescription>
            Create a new workstation with hot desks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="workstationFloor">Floor</Label>
              <Select
                value={newWorkstationFloor}
                onValueChange={setNewWorkstationFloor}
              >
                <SelectTrigger id="workstationFloor">
                  <SelectValue placeholder="Select floor" />
                </SelectTrigger>
                <SelectContent>
                  {floors.map((floor: { id: string; name: string }) => (
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
                onChange={(e) =>
                  setNewWorkstationHotDesks(parseInt(e.target.value) || 0)
                }
                placeholder="e.g., 2"
              />
            </div>
            <div className="flex items-end">
              <Button
                onClick={addWorkstation}
                className="w-full"
                disabled={
                  !newWorkstationName || 
                  !newWorkstationFloor || 
                  newWorkstationHotDesks <= 0
                }
              >
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
          <CardDescription>
            View and manage existing workstations
          </CardDescription>
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
              {workstations.map((workstation: Workstation) => (
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
    </>
  );
}