"use client";

import { Button } from "@/components/ui/button";
import { ClustersPageHeaderProps } from "@/types";
import { ArrowLeft, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export const ClustersPageHeader = ({ onNewClusterClick }: ClustersPageHeaderProps) => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center">
        <Button variant="ghost" onClick={() => router.push("/admin")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>
      </div>
      <h1 className="text-2xl font-bold">Clusters</h1>
      <Button onClick={onNewClusterClick}>
        <Plus className="mr-2 h-4 w-4" /> New Cluster
      </Button>
    </div>
  );
};