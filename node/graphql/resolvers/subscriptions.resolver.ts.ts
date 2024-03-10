
import {PubSub, withFilter} from 'graphql-subscriptions'

export const pubsub = new PubSub();

export const subscriptionResolvers = {

    Subscription: {
        taskCreated: {
            subscribe: () => pubsub.asyncIterator('TASK_CREATED')
        }
        ,
        taskDeleted: {
            subscribe: () => pubsub.asyncIterator('TASK_DELETED')
        },

        taskUpdated: {
            subscribe: () => pubsub.asyncIterator('TASK_UPDATED')
        }
    } 
}