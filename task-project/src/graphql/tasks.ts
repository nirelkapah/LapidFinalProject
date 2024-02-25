import { gql } from "@apollo/client";

export const QUERY_TASKS_LIST = gql`
  query Query{
    tasks {
      _id
      title
      description
      estimatedTime
      status
      priority
      untilDate
      review
      timeSpent
    }
  }
`;

export const QUERY_TASKS_LIST_BY_KEYWORD = gql`
  query Query($keyword: String) {
    tasksByKeyword(keyword: $keyword) {
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
  query TasksByKeywordAndFilters($keyword: String, $filters: Filters) {
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

export const CREATE_TASK = gql`
  mutation CreateTask($taskInput: TaskInput) {
    createTask(taskInput: $taskInput) {
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

export const UPDATE_TASK = gql`
mutation UpdateTask($taskInput: TaskInput) {
  updateTask(taskInput: $taskInput) {
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

// export const CREATE_TASK = gql`
//   mutation Mutation(
//     $title: String!
//     $description: String!
//     $estimatedTime: Float!
//     $status: String!
//     $priority: String!
//     $untilDate: String
//     $review: String
//     $timeSpent: Float
//   ) {
//     createTask(
//       taskInput: {
//         title: $title
//         description: $description
//         estimatedTime: $estimatedTime
//         status: $status
//         priority: $priority
//         untilDate: $untilDate
//         review: $review
//         timeSpent: $timeSpent
//       }
//     ) {
//       _id
//       title
//       description
//       estimatedTime
//       status
//       priority
//       untilDate
//       review
//       timeSpent
//     }
//   }
// `;

// export const UPDATE_TASK = gql`
// mutation Mutation (
//   $id: String!
//   $title: String!
//   $description: String!
//   $estimatedTime: Float!
//   $status: String!
//   $priority: String!
//   $untilDate: String
//   $review: String
//   $timeSpent: Float
// ) {
//   updateTask(
//     taskInput: {
//       _id: $id
//       title: $title
//       description: $description
//       estimatedTime: $estimatedTime
//       status: $status
//       priority: $priority
//       untilDate: $untilDate
//       review: $review
//       timeSpent: $timeSpent
//     }
//   ) {
//     _id
//     title
//     description
//     estimatedTime
//     status
//     priority
//     untilDate
//     review
//     timeSpent
//   }
// }
// `;

// export const UPDATE_TASK2 = gql`
//   mutation updateTask(
//     $id: String!
//     $title: String!
//     $description: String!
//     $estimatedTime: Float!
//     $status: String!
//     $priority: String!
//     $untilDate: String
//     $review: String
//     $timeSpent: Float
//   ) {
//     updateTask(
//       taskInput: {
//         _id: $id
//         title: $title
//         description: $description
//         estimatedTime: $estimatedTime
//         status: $status
//         priority: $priority
//         untilDate: $untilDate
//         review: $review
//         timeSpent: $timeSpent
//       }
//     ) {
//       _id
//       title
//       description
//       estimatedTime
//       status
//       priority
//       untilDate
//       review
//       timeSpent
//     }
//   }
// `;

export const DELETE_TASK = gql`
  mutation deleteTask($id: String!) {
    deleteTask(_id: $id) {
      _id
    }
  }
`;
