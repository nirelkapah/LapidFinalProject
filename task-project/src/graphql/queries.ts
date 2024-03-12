import { gql } from "@apollo/client";

export const QUERY_TASK_BY_ID = gql`
  query TaskById($taskId: String!) {
    taskById(id: $taskId) {
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
`;

export const QUERY_TASKS_LIST_BY_KEYWORD_AND_FILTERS = gql`
  query TasksByKeywordAndFilters($keyword: String!, $filters: Filters!) {
    tasksByKeywordAndFilters(keyword: $keyword, filters: $filters) {
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
`;
