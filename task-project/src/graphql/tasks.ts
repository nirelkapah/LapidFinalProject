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
  query tasksByKeyword($keyword: String!) {
    tasksByKeyword(keyword: $keyword) {
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

export const SEND_NEW_TASK = gql`
  mutation {
    createTask(
      taskInput: {
        title: $title
        description: $description
        estimatedTime: $estimatedTime
        status: $status
        priority: $priority
        timeSpent: $timespent
        untilDate: $untilDate
        review: $review
      }
    ) {
      title
      description
      untilDate
    }
  }
`;

export const CREATE_TASK = gql`
  mutation createTask(
    $title: String!
    $description: String!
    $estimatedTime: Float!
    $status: String!
    $priority: String!
    $untilDate: String
    $review: String
    $timeSpent: Float
  ) {
    createTask(
      taskInput: {
        title: $title
        description: $description
        estimatedTime: $estimatedTime
        status: $status
        priority: $priority
        untilDate: $untilDate
        review: $review
        timeSpent: $timeSpent
      }
    ) {
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

export const UPDATE_TASK = gql`
  mutation updateTask(
    $id: String!
    $title: String!
    $description: String!
    $estimatedTime: Float!
    $status: String!
    $priority: String!
    $untilDate: String
    $review: String
    $timeSpent: Float
  ) {
    updateTask(
      taskInput: {
        _id: $id
        title: $title
        description: $description
        estimatedTime: $estimatedTime
        status: $status
        priority: $priority
        untilDate: $untilDate
        review: $review
        timeSpent: $timeSpent
      }
    ) {
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

export const DELETE_TASK = gql`
  mutation deleteTask($id: String!) {
    deleteTask(_id: $id) {
      _id
    }
  }
`;
