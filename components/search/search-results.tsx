import { SearchResultsProps } from "@/types";
import { SearchResultItem } from "@/components/search/search-results-item"

export function SearchResults({ results, onResultClick }: SearchResultsProps) {
  return (
    <div className="space-y-1">
      {results.map((result) => (
        <SearchResultItem key={result.id} result={result} onClick={onResultClick} />
      ))}
    </div>
  )
}