import { useState } from "react"
import { initialClusters } from "@/app/admin/mocks/data"
import { useToast } from "@/hooks/use-sonner"
import { toUrlFriendly, fromUrlFriendly } from "@/utils/url-utils"

// Define a type for clusters
interface Cluster {
  id: string
  name: string
  size: number
  slug?: string
}

export const useClusters = () => {
  // Initialize with slugs for each cluster
  const [clusters, setClusters] = useState<Cluster[]>(
    initialClusters.map(cluster => ({
      ...cluster,
      slug: toUrlFriendly(cluster.name)
    }))
  )
  const [newClusterName, setNewClusterName] = useState("")
  const toast = useToast()

  const addCluster = () => {
    // Ensure the ID is always two digits (01, 02, 03, etc.)
    const nextClusterId = (clusters.length + 1).toString().padStart(2, "0")

    const newCluster = {
      id: nextClusterId,  // This will be 01, 02, 03, etc.
      name: newClusterName,
      size: 0,  // Initialize the size property
      slug: toUrlFriendly(newClusterName)
    }

    setClusters([...clusters, newCluster])
    setNewClusterName("")  // Reset the input
    toast.success("Cluster added successfully")
  }

  const deleteCluster = (id: string) => {
    setClusters(clusters.filter((cluster) => cluster.id !== id))
    toast.success("Cluster deleted successfully")
  }

  // Find cluster by slug
  const getClusterBySlug = (slug: string) => {
    return clusters.find(cluster => cluster.slug === slug)
  }

  return {
    clusters,
    newClusterName,
    setNewClusterName,
    addCluster,
    deleteCluster,
    getClusterBySlug,
    toUrlFriendly,
    fromUrlFriendly
  }
}