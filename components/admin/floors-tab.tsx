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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { PlusCircle, Trash2 } from "lucide-react";
import { useFloors } from "@/hooks/use-floors";

export default function FloorsTab() {
  const { floors, newFloorName, setNewFloorName, addFloor, deleteFloor } =
    useFloors();

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Add New Floor</CardTitle>
          <CardDescription>
            Create a new floor for workstations
          </CardDescription>
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
              <Button
                onClick={addFloor}
                className="w-full"
                disabled={!newFloorName}
              >
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
              {floors.map((floor: { id: string; name: string }) => (
                <TableRow key={floor.id}>
                  <TableCell>{floor.id}</TableCell>
                  <TableCell>{floor.name}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteFloor(floor.id)}
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