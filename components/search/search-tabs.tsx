import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SearchTabsProps } from "@/types/search"

export function SearchTabs({ activeTab, onTabChange }: SearchTabsProps) {
  return (
    <div className="mb-2">
      <Tabs defaultValue="all" value={activeTab} onValueChange={onTabChange}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all" className="text-xs">
            All
          </TabsTrigger>
          <TabsTrigger value="booking" className="text-xs">
            Bookings
          </TabsTrigger>
          <TabsTrigger value="floor" className="text-xs">
            Floors
          </TabsTrigger>
          <TabsTrigger value="cluster" className="text-xs">
            Clusters
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}