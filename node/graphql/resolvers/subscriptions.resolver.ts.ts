
import {PubSub, withFilter} from 'graphql-subscriptions';
import {SubscriptionTaskCreatedArgs, SubscriptionTaskUpdatedArgs} from "../../../task-project/src/gql/graphql";
import { queryResolvers } from './queries.resolver.ts';

export const pubsub = new PubSub();

export const subscriptionResolvers = {

    Subscription: {
        taskCreated: {
            subscribe: withFilter(() => pubsub.asyncIterator('TASK_CREATED'), async (payload, variables: SubscriptionTaskCreatedArgs) => {
                    const taskById = await queryResolvers.Query.taskByIdKeywordAndFilters('', {id: payload.taskCreated, keyword: variables.keyword, filters: variables.filters})
                    return taskById._id === payload.taskCreated;
            })
        }
        ,
        taskDeleted: {
            subscribe: () => pubsub.asyncIterator(['TASK_DELETED']),
        },

        taskUpdated: {
            subscribe: withFilter(() => pubsub.asyncIterator('TASK_UPDATED'), async (payload, variables: SubscriptionTaskUpdatedArgs) => {
                const taskById = await queryResolvers.Query.taskByIdKeywordAndFilters('', {id: payload.taskUpdated, keyword: variables.keyword, filters: variables.filters})
                return taskById._id === payload.taskUpdated;
            })
        }
    } 
}