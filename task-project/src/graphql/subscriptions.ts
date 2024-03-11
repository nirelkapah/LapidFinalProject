import {gql} from '@apollo/client';

export const TASK_CREATED  = gql`
    subscription taskCreated($keyword: String, $filters: Filters) {
    taskCreated(keyword: $keyword, filters: $filters)
    }
`;

export const TASK_UPDATED  = gql`
    subscription taskUpdated($keyword: String, $filters: Filters) {
        taskUpdated(keyword: $keyword, filters: $filters)
    }
`;

export const TASK_DELETED  = gql`
    subscription taskDeleted {
        taskDeleted
    }
`;