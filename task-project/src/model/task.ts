
export interface Task {

    id: string,
    title: string,
    description: string,
    estimatedTime: number,
    status: string,
    priority: string,
    untilDate: Date,
    review: string,
    timeSpent: number,
}