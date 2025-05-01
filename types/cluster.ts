export interface Cluster {
  id: string;
  name: string;
  size: number;
  slug?: string;
}

export interface ClusterData {
  name: string;
  booked: number;
  total: number;
}

export interface ClusterUtilizationProps {
  clusters: ClusterData[];
}
export interface ClusterSelectionProps {
  cluster: string;
  onClusterChange: (value: string) => void;
}
export interface AddClusterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newClusterName: string;
  setNewClusterName: (name: string) => void;
  handleAddCluster: () => void;
}
export interface ClusterCardProps {
  cluster: {
    name: string;
    booked: number;
    total: number;
  };
}
export interface ClusterOverviewProps {
  cluster: {
    name: string;
    total: number;
    booked: number;
  };
  utilizationPercentage: number;
}

export interface ClustersPageHeaderProps {
  onNewClusterClick: () => void;
}
export interface UtilizationProgressProps {
  utilizationPercentage: number;
}