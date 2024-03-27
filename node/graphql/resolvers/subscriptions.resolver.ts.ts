
import {PubSub, withFilter} from 'graphql-subscriptions';
import {SubscriptionTaskCreatedArgs, Task} from "../../../task-project/src/gql/graphql";
import { queryResolvers } from './queries.resolver.ts';
import { statusList , priorityList} from './queries.resolver.ts'; 

export const pubsub = new PubSub();

const isTaskMatchFilters = (task: Task, keyword: string, filters: []) => {
    
    const keywordResult: boolean = keyword === '' ? true : 
    (task.description.includes(keyword) || 
    task.review?.includes(keyword) || 
    task.title.includes(keyword) || 
    task.priority.includes(keyword) || 
    task.status.includes(keyword)) ? true : false;

    const filtersResult: boolean = filters.length === 0 ? true : filters.every(filter => (filter === task.status) || (filter === task.priority)) ? true : false;

    return keywordResult && filtersResult ? true : false
}

export const subscriptionResolvers = {

    Subscription: {
        taskCreated: {
            subscribe: withFilter(() => pubsub.asyncIterator('TASK_CREATED'), async (payload, variables: any) => {
                    // const taskById = await queryResolvers.Query.taskByIdKeywordAndFilters('', {id: payload.taskCreated, keyword: variables.keyword, filters: variables.filters})
                    // return taskById._id === payload.taskCreated;
                    // console.log('PAYLOAD: ', payload)
                    const result = isTaskMatchFilters(payload.taskCreated, variables.keyword, variables.filters)
                    return result;
            }),
            resolve: (payload: any) => {
                console.log(payload)
                return payload.taskCreated._id;
            },
        }
        ,
        taskDeleted: {
            subscribe: withFilter(() => pubsub.asyncIterator('TASK_DELETED'), async (payload, variables: any) => {
                const result = isTaskMatchFilters(payload.taskDeleted, variables.keyword, variables.filters)
                return result;


        }),
        resolve: (payload: any) => {
          return payload.taskDeleted._id;
        },
        },

        taskUpdated: {
            // subscribe: withFilter(() => pubsub.asyncIterator('TASK_UPDATED'), async (payload: { filterCondition: boolean, taskUpdated: string }, variables: SubscriptionTaskUpdatedArgs) => {
            //     const taskById = await queryResolvers.Query.taskByIdKeywordAndFilters('', {id: payload.taskUpdated, keyword: variables.keyword, filters: variables.filters});
            //     payload.filterCondition = taskById._id === payload.taskUpdated ? true : false;
            //     return taskById._id === payload.taskUpdated;
            // }),
            // resolve: (payload: { filterCondition: boolean, taskUpdated: string }) => {
            //     console.log(payload.filterCondition)
            //     return payload.filterCondition ? 'ADD ' + payload.taskUpdated : 'REMOVE ' + payload.taskUpdated
            // }
            subscribe: () => pubsub.asyncIterator(['TASK_UPDATED']),

        }
    } 
}