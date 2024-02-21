import {gql} from '@apollo/client';

export const TASK_CREATED  = gql`
    subscription TaskCreated {
        taskCreated {
            _id
            description
            estimatedTime
            priority
            review
            status
            timeSpent
            title
            untilDate
        }
    }
`

export const TASK_UPDATED  = gql`
    subscription TaskUpdated {
        taskUpdated {
        _id
        description
        priority
        estimatedTime
        review
        status
        timeSpent
        title
        untilDate
        }
    }
`

export const TASK_DELETED  = gql`
    subscription Subscription {
        taskDeleted
    }
`