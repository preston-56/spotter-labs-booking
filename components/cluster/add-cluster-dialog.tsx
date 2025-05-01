"use client"

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AddClusterDialogProps } from "@/types";

export const AddClusterDialog = ({ open, onOpenChange, newClusterName, setNewClusterName, handleAddCluster }: AddClusterDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
          <Button onClick={() => onOpenChange(false)} variant="outline">Cancel</Button>
          <Button onClick={handleAddCluster} disabled={!newClusterName.trim()}>
            Add Cluster
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};