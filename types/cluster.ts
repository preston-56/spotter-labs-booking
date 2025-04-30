export interface Cluster {
    id: string;
    name: string;
    size: string;
  }
  
  export interface ClusterData {
    name: string;
    booked: number;
    total: number;
  }

  export interface ClusterUtilizationProps {
    clusters: ClusterData[];
  }
  