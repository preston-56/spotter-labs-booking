"use client"

import { useState, useEffect, useRef } from "react"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { format } from "date-fns"
import { mockBookings, availableWorkstations, clusterUtilization, timeSlots } from "@/mocks"
import { SearchResult } from "@/types/search"
import { SearchTabs } from "@/components/search/search-tabs"
import { SearchResults } from "@/components/search/search-results"
import { NoResults } from "@/components/search/no-results"
import { SearchFooter } from "@/components/search/search-footer"

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
          icon: "calendar",
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
          icon: "building",
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
          icon: "users",
          url: `/clusters/${encodeURIComponent(cluster.name)}`,
        })
      }
    })

    timeSlots.forEach((slot) => {
      if (slot.toLowerCase().includes(lowerQuery)) {
        searchResults.push({
          id: `time-${slot}`,
          type: "booking",
          title: `Time Slot: ${slot}`,
          subtitle: "Search for bookings in this time slot",
          icon: "clock",
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
          <SearchTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {filteredResults.length > 0 ? (
            <SearchResults results={filteredResults} onResultClick={() => setIsOpen(false)} />
          ) : (
            <NoResults />
          )}

          {filteredResults.length > 0 && (
            <SearchFooter resultCount={filteredResults.length} />
          )}
        </Card>
      )}
    </div>
  )
}