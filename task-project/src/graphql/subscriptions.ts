import {gql} from '@apollo/client';

export const TASK_CREATED  = gql`
    subscription Subscription {
        taskCreated
    }
`

export const TASK_UPDATED  = gql`
    subscription Subscription {
        taskUpdated
    }
`

export const TASK_DELETED  = gql`
    subscription Subscription {
        taskDeleted
    }
`