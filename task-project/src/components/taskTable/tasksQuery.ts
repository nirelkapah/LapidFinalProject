import { gql } from '@apollo/client';

export const QUERY_TASKS_LIST = gql`
  query {
    tasks {_id, title, description, estimatedTime, status , priority, untilDate, review, timeSpent}
  }
`;
