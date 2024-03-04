import { gql } from "@apollo/client";

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

export const DELETE_TASK = gql`
  mutation deleteTask($id: String!) {
    deleteTask(_id: $id) {
      _id
    }
  }
`;
