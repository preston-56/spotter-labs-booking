"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { clusters } from "@/mocks";
import { ClusterSelectionProps } from "@/types";

export function ClusterSelection({
  cluster,
  onClusterChange
}: ClusterSelectionProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="cluster">Cluster</Label>
      <Select value={cluster} onValueChange={onClusterChange}>
        <SelectTrigger
          id="cluster"
          className="w-3/4 border-indigo-200 dark:border-indigo-800"
        >
          <SelectValue placeholder="Select your cluster" />
        </SelectTrigger>
        <SelectContent>
          {clusters.map((c) => (
            <SelectItem key={c.id} value={c.id}>
              {c.name} ({c.size})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
