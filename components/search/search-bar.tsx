"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Search, X, Calendar, Building, Users, Clock, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { mockBookings, availableWorkstations, clusterUtilization } from "@/mocks/data"

type SearchResult = {
  id: string
  type: "booking" | "workstation" | "cluster" | "floor"
  title: string
  subtitle: string
  date?: Date
  icon: React.ReactNode
  url?: string
}

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [activeTab, setActiveTab] = useState<string>("all")
  const [results, setResults] = useState<SearchResult[]>([])
  const searchRef = useRef<HTMLDivElement>(null)

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Search logic
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const lowerQuery = query.toLowerCase()
    const searchResults: SearchResult[] = []

    // Search bookings
    mockBookings.forEach((booking) => {
      const matchesQuery =
        booking.cluster.toLowerCase().includes(lowerQuery) ||
        booking.floor.toLowerCase().includes(lowerQuery) ||
        booking.workstation.toLowerCase().includes(lowerQuery) ||
        booking.hotDesk.toLowerCase().includes(lowerQuery) ||
        format(booking.date, "PPP").toLowerCase().includes(lowerQuery) ||
        booking.timeSlot.toLowerCase().includes(lowerQuery)

      if (matchesQuery) {
        searchResults.push({
          id: booking.id,
          type: "booking",
          title: `${booking.cluster} - ${booking.workstation}`,
          subtitle: `${format(booking.date, "PPP")} at ${booking.timeSlot}`,
          date: booking.date,
          icon: <Calendar className="h-4 w-4 text-indigo-500" />,
          url: `/bookings/${booking.id}`,
        })
      }
    })

    // Search workstations
    Object.entries(availableWorkstations).forEach(([floor, count]) => {
      if (floor.toLowerCase().includes(lowerQuery) || count.toString().includes(lowerQuery)) {
        searchResults.push({
          id: `ws-${floor}`,
          type: "floor",
          title: floor,
          subtitle: `${count} workstations available`,
          icon: <Building className="h-4 w-4 text-green-500" />,
          url: `/availability?floor=${encodeURIComponent(floor)}`,
        })
      }
    })

    // Search clusters
    clusterUtilization.forEach((cluster) => {
      if (cluster.name.toLowerCase().includes(lowerQuery)) {
        searchResults.push({
          id: `cluster-${cluster.name}`,
          type: "cluster",
          title: cluster.name,
          subtitle: `${cluster.booked}/${cluster.total} workstations booked`,
          icon: <Users className="h-4 w-4 text-blue-500" />,
          url: `/clusters/${encodeURIComponent(cluster.name)}`,
        })
      }
    })

    // Add time slots
    const timeSlots = [
      "08:00 - 09:00",
      "09:00 - 10:00",
      "10:00 - 11:00",
      "11:00 - 12:00",
      "12:00 - 13:00",
      "13:00 - 14:00",
      "14:00 - 15:00",
      "15:00 - 16:00",
      "16:00 - 17:00",
    ]

    timeSlots.forEach((slot) => {
      if (slot.toLowerCase().includes(lowerQuery)) {
        searchResults.push({
          id: `time-${slot}`,
          type: "booking",
          title: `Time Slot: ${slot}`,
          subtitle: "Search for bookings in this time slot",
          icon: <Clock className="h-4 w-4 text-orange-500" />,
          url: `/book?time=${encodeURIComponent(slot)}`,
        })
      }
    })

    setResults(searchResults)
  }, [query])

  // Filter results based on active tab
  const filteredResults = activeTab === "all" ? results : results.filter((result) => result.type === activeTab)

  return (
    <div className="relative w-full max-w-md" ref={searchRef}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-4 w-4 text-muted-foreground" />
        </div>
        <Input
          type="search"
          className="pl-10 pr-10"
          placeholder="Search bookings, workstations, or availability..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            if (e.target.value.trim()) {
              setIsOpen(true)
            }
          }}
          onFocus={() => {
            if (query.trim()) {
              setIsOpen(true)
            }
          }}
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={() => {
              setQuery("")
              setIsOpen(false)
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {isOpen && query.trim() && (
        <Card className="absolute z-50 w-full mt-1 p-2 shadow-lg max-h-[70vh] overflow-auto">
          <div className="mb-2">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
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

          {filteredResults.length > 0 ? (
            <div className="space-y-1">
              {filteredResults.map((result) => (
                <a
                  key={result.id}
                  href={result.url || "#"}
                  className="flex items-center p-2 rounded-md hover:bg-muted transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="mr-3">{result.icon}</div>
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
              ))}
            </div>
          ) : (
            <div className="py-6 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium">No results found</p>
              <p className="text-xs text-muted-foreground mt-1">Try adjusting your search terms</p>
            </div>
          )}

          {filteredResults.length > 0 && (
            <div className="mt-2 pt-2 border-t flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                {filteredResults.length} result{filteredResults.length !== 1 ? "s" : ""} found
              </p>
              <Button variant="ghost" size="sm" className="text-xs h-7 px-2">
                <Filter className="h-3 w-3 mr-1" /> Advanced Search
              </Button>
            </div>
          )}
        </Card>
      )}
    </div>
  )
}
