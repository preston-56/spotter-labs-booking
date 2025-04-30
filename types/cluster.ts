export interface Cluster {
    id: string;
    name: string;
    size: number;
    slug?: string
  }
  
  export interface ClusterData {
    name: string;
    booked: number;
    total: number;
  }

  export interface ClusterUtilizationProps {
    clusters: ClusterData[];
  }
  