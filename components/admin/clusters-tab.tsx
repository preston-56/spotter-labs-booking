"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useClusters } from "@/hooks/use-clusters";
import AddFormCard from "@/components/common/add-form-card";
import DataTable from "@/components/common/data-table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

export default function ClustersTab() {
  const {
    clusters,
    newClusterName,
    setNewClusterName,
    addCluster,
    deleteCluster
  } = useClusters();

  const columns = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Name' }
  ];

  return (
    <>
      <AddFormCard
        title="Add New Cluster"
        description="Create a new cluster"
        onSubmit={addCluster}
        submitText="Add Cluster"
        isDisabled={!newClusterName}
      >
        <div className="space-y-2">
          <Label htmlFor="clusterName">Cluster Name</Label>
          <Input
            id="clusterName"
            value={newClusterName}
            onChange={(e) => setNewClusterName(e.target.value)}
            placeholder="e.g., Cluster A"
          />
        </div>
      </AddFormCard>

      <Card>
        <CardHeader>
          <CardTitle>Manage Clusters</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={clusters}
            columns={columns}
            idField="id"
            onDelete={deleteCluster}
            actionLabel="Delete"
          />
        </CardContent>
      </Card>
    </>
  );
}