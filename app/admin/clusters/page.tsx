"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useClusters } from "@/hooks/use-clusters";
import { clusterUtilization } from "@/mocks";
import { ClustersPageHeader } from "@/components/cluster/cluster-page-header";
import { ClusterCard } from "@/components/cluster/cluster-card";
import { AddClusterDialog } from "@/components/cluster/add-cluster-dialog";

export default function ClustersPage() {
  const { addCluster } = useClusters();
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newClusterName, setNewClusterName] = useState("");

  // Replace this with actual admin check
  const isAdmin = true; // check if the user is an admin

  if (!isAdmin) {
    router.push("/forbidden");
    return null; // Prevent rendering until redirect happens
  }

  const handleAddCluster = () => {
    if (newClusterName.trim()) {
      addCluster(); // Implement addCluster with newClusterName
      setNewClusterName("");
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <ClustersPageHeader onNewClusterClick={() => setIsDialogOpen(true)} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {clusterUtilization.map((cluster) => (
          <ClusterCard key={cluster.name} cluster={cluster} />
        ))}
      </div>

      <AddClusterDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        newClusterName={newClusterName}
        setNewClusterName={setNewClusterName}
        handleAddCluster={handleAddCluster}
      />
    </div>
  );
}
