import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SearchFooterProps } from "@/types"

export function SearchFooter({ resultCount }: SearchFooterProps) {
  return (
    <div className="mt-2 pt-2 border-t flex items-center justify-between">
      <p className="text-xs text-muted-foreground">
        {resultCount} result{resultCount !== 1 ? "s" : ""} found
      </p>
      <Button variant="ghost" size="sm" className="text-xs h-7 px-2">
        <Filter className="h-3 w-3 mr-1" /> Advanced Search
      </Button>
    </div>
  )
}