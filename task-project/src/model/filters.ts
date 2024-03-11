export interface Filters {
    status: [StatusOptions?],
    priority: [PriorityOptions?]
}

export type PriorityOptions = 'Top' | 'Minor' | 'Regular'

export type StatusOptions = 'Open' | 'Closed' | 'Urgent'

export interface keywordAndFilters { 
    keyword: string,
    filters: Filters
}

  
  