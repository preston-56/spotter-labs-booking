import { Search } from "lucide-react"

export function NoResults() {
  return (
    <div className="py-6 text-center">
      <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
        <Search className="h-6 w-6 text-muted-foreground" />
      </div>
      <p className="text-sm font-medium">No results found</p>
      <p className="text-xs text-muted-foreground mt-1">Try adjusting your search terms</p>
    </div>
  )
}