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

export const QUERY_TASK_BY_ID_KEYWORD_AND_FILTERS = gql`
  query TaskByIdKeywordAndFilters($taskByIdKeywordAndFiltersId: String!, $keyword: String, $filters: [String]) {
    taskByIdKeywordAndFilters(id: $taskByIdKeywordAndFiltersId, keyword: $keyword, filters: $filters) {
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

export const QUERY_TASKS_LIST_BY_KEYWORD_AND_FILTERS = gql`
  query TasksByKeywordAndFilters($keyword: String!, $filters: [String]!) {
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
