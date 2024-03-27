import {gql} from '@apollo/client';

export const TASK_CREATED  = gql`
    subscription taskCreated($keyword: String, $filters: [String]) {
    taskCreated(keyword: $keyword, filters: $filters)
    }
`;

export const TASK_UPDATED  = gql`
    subscription taskUpdated {
        taskUpdated
    }
`;

export const TASK_DELETED  = gql`
    subscription taskDeleted($keyword: String, $filters: [String]) {
        taskDeleted(keyword: $keyword, filters: $filters)
    }
`;