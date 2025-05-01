import { Calendar, Building, Users, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { SearchResultItemProps } from "@/types/search"

export function SearchResultItem({ result, onClick }: SearchResultItemProps) {
  const iconMap = {
    calendar: <Calendar className="h-4 w-4 text-indigo-500" />,
    building: <Building className="h-4 w-4 text-green-500" />,
    users: <Users className="h-4 w-4 text-blue-500" />,
    clock: <Clock className="h-4 w-4 text-orange-500" />
  }

  return (
    <a
      href={result.url || "#"}
      className="flex items-center p-2 rounded-md hover:bg-muted transition-colors"
      onClick={onClick}
    >
      <div className="mr-3">{iconMap[result.icon as keyof typeof iconMap]}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{result.title}</p>
        <p className="text-xs text-muted-foreground truncate">{result.subtitle}</p>
      </div>
      <Badge
        variant="outline"
        className={cn(
          "ml-2",
          result.type === "booking" &&
            "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-300",
          result.type === "floor" && "bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-300",
          result.type === "cluster" && "bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-300",
        )}
      >
        {result.type === "booking"
          ? "Booking"
          : result.type === "floor"
            ? "Floor"
            : result.type === "cluster"
              ? "Cluster"
              : "Other"}
      </Badge>
    </a>
  )
}