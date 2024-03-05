export interface SortType {
    orderType: ColumnType,
    direction: ColumnDirection
  }

export type ColumnDirection = 'down' | 'up' | ''

export type ColumnType = 'priority' | 'status' | 'estimatedTime' | 'description' | 'title' | ''