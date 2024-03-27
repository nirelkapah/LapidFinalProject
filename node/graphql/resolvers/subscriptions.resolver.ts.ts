
import {PubSub, withFilter} from 'graphql-subscriptions';
import {SubscriptionTaskCreatedArgs, SubscriptionTaskUpdatedArgs, SubscriptionTaskDeletedArgs, Task} from "../../../task-project/src/gql/graphql";
import { isTaskMatchFilters } from '../../utls/taskMatchToFilters';

export const pubsub = new PubSub();

export const subscriptionResolvers = {

    Subscription: {
        taskCreated: {
            subscribe: withFilter(() => pubsub.asyncIterator('TASK_CREATED'), async (payload: {taskCreated: Task}, variables: SubscriptionTaskCreatedArgs) => 
                isTaskMatchFilters(payload.taskCreated, variables.keyword, variables.filters)
            ),
            resolve: (payload: {taskCreated: Task}) => {
                return payload.taskCreated._id;
            },
        }
        ,
        taskDeleted: {
            subscribe: withFilter(() => pubsub.asyncIterator('TASK_DELETED'), async (payload: {taskDeleted: Task}, variables: SubscriptionTaskDeletedArgs) => 
                isTaskMatchFilters(payload.taskDeleted, variables.keyword, variables.filters)
            ),
            resolve: (payload: {taskDeleted: Task}) => {
            return payload.taskDeleted._id;
            },
        },

        taskUpdated: {
            subscribe: withFilter(() => pubsub.asyncIterator('TASK_UPDATED'), async (payload: {taskUpdated: Task, oldTask: Task}, variables: SubscriptionTaskUpdatedArgs) => {
                const updatedTaskMatch = isTaskMatchFilters(payload.taskUpdated, variables.keyword, variables.filters);
                const oldTaskMatch = isTaskMatchFilters(payload.oldTask, variables.keyword, variables.filters);
                return (updatedTaskMatch || oldTaskMatch);
            }),
            resolve: (payload: {taskUpdated: Task, oldTask: Task}) => {
                return payload.taskUpdated._id;
            },

        }
    } 
}