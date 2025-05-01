export interface SearchResult {
    id: string
    type: 'booking' | 'floor' | 'cluster' | string
    title: string
    subtitle: string
    icon: 'calendar' | 'building' | 'users' | 'clock' | string
    url?: string
    date?: Date
  }

  export interface SearchTabsProps {
    activeTab: string
    onTabChange: (value: string) => void
  }

  export interface SearchResultsProps {
    results: SearchResult[]
    onResultClick: () => void
  }

  export interface SearchResultItemProps {
    result: SearchResult
    onClick: () => void
  }

  export interface SearchFooterProps {
    resultCount: number
  }