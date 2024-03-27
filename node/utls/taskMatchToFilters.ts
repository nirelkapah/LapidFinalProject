import { Task } from "../../task-project/src/gql/graphql";

export const isTaskMatchFilters = (task: Task, keyword: string, filters: []) => {

    const keywordResult: boolean = keyword === '' ? true : 
    (task.description.includes(keyword) || 
    task.review?.includes(keyword) || 
    task.title.includes(keyword) || 
    task.priority.includes(keyword) || 
    task.status.includes(keyword)) ? true : false;

    const filtersResult: boolean = filters.length === 0 ? true : filters.every(filter => (filter === task.status) || (filter === task.priority)) ? true : false;

    return keywordResult && filtersResult ? true : false
}