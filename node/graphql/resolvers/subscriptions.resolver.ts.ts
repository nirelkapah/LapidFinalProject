
import {PubSub, withFilter} from 'graphql-subscriptions';
import {SubscriptionTaskCreatedArgs, Task} from "../../../task-project/src/gql/graphql";
import { isTaskMatchFilters } from '../../utls/taskMatchToFilters';

export const pubsub = new PubSub();

export const subscriptionResolvers = {

    Subscription: {
        taskCreated: {
            subscribe: withFilter(() => pubsub.asyncIterator('TASK_CREATED'), async (payload, variables: any) => 
                isTaskMatchFilters(payload.taskCreated, variables.keyword, variables.filters)
            ),
            resolve: (payload: any) => {
                return payload.taskCreated._id;
            },
        }
        ,
        taskDeleted: {
            subscribe: withFilter(() => pubsub.asyncIterator('TASK_DELETED'), async (payload, variables: any) => 
                isTaskMatchFilters(payload.taskDeleted, variables.keyword, variables.filters)
            ),
            resolve: (payload: any) => {
            return payload.taskDeleted._id;
            },
        },

        taskUpdated: {
            subscribe: withFilter(() => pubsub.asyncIterator('TASK_UPDATED'), async (payload, variables: any) => {
                const updatedTaskMatch = isTaskMatchFilters(payload.taskUpdated, variables.keyword, variables.filters);
                const oldTaskMatch = isTaskMatchFilters(payload.oldTask, variables.keyword, variables.filters);
                return (updatedTaskMatch || oldTaskMatch);
            }),
            resolve: (payload: any) => {
                return payload.taskUpdated._id;
            },

        }
    } 
}