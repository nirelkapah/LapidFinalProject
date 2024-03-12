/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation CreateTask($taskInput: TaskInput!) {\n    createTask(taskInput: $taskInput) {\n      _id\n      description\n      estimatedTime\n      priority\n      review\n      status\n      timeSpent\n      title\n      untilDate\n    }\n  }\n": types.CreateTaskDocument,
    "\nmutation UpdateTask($taskInput: TaskInput!) {\n  updateTask(taskInput: $taskInput) {\n    _id\n    description\n    estimatedTime\n    priority\n    review\n    status\n    timeSpent\n    title\n    untilDate\n  }\n}\n": types.UpdateTaskDocument,
    "\n  mutation deleteTask($id: String!) {\n    deleteTask(_id: $id) {\n      _id\n    }\n  }\n": types.DeleteTaskDocument,
    "\n  query TaskById($taskId: String!) {\n    taskById(id: $taskId) {\n      _id\n      description\n      estimatedTime\n      priority\n      review\n      status\n      timeSpent\n      title\n      untilDate\n    }\n  }\n": types.TaskByIdDocument,
    "\n  query TasksByKeywordAndFilters($keyword: String!, $filters: Filters!) {\n    tasksByKeywordAndFilters(keyword: $keyword, filters: $filters) {\n      _id\n      description\n      estimatedTime\n      priority\n      review\n      status\n      timeSpent\n      title\n      untilDate\n    }\n  }\n": types.TasksByKeywordAndFiltersDocument,
    "\n    subscription taskCreated($keyword: String, $filters: Filters) {\n    taskCreated(keyword: $keyword, filters: $filters)\n    }\n": types.TaskCreatedDocument,
    "\n    subscription taskUpdated($keyword: String, $filters: Filters) {\n        taskUpdated(keyword: $keyword, filters: $filters)\n    }\n": types.TaskUpdatedDocument,
    "\n    subscription taskDeleted {\n        taskDeleted\n    }\n": types.TaskDeletedDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateTask($taskInput: TaskInput!) {\n    createTask(taskInput: $taskInput) {\n      _id\n      description\n      estimatedTime\n      priority\n      review\n      status\n      timeSpent\n      title\n      untilDate\n    }\n  }\n"): (typeof documents)["\n  mutation CreateTask($taskInput: TaskInput!) {\n    createTask(taskInput: $taskInput) {\n      _id\n      description\n      estimatedTime\n      priority\n      review\n      status\n      timeSpent\n      title\n      untilDate\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation UpdateTask($taskInput: TaskInput!) {\n  updateTask(taskInput: $taskInput) {\n    _id\n    description\n    estimatedTime\n    priority\n    review\n    status\n    timeSpent\n    title\n    untilDate\n  }\n}\n"): (typeof documents)["\nmutation UpdateTask($taskInput: TaskInput!) {\n  updateTask(taskInput: $taskInput) {\n    _id\n    description\n    estimatedTime\n    priority\n    review\n    status\n    timeSpent\n    title\n    untilDate\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteTask($id: String!) {\n    deleteTask(_id: $id) {\n      _id\n    }\n  }\n"): (typeof documents)["\n  mutation deleteTask($id: String!) {\n    deleteTask(_id: $id) {\n      _id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TaskById($taskId: String!) {\n    taskById(id: $taskId) {\n      _id\n      description\n      estimatedTime\n      priority\n      review\n      status\n      timeSpent\n      title\n      untilDate\n    }\n  }\n"): (typeof documents)["\n  query TaskById($taskId: String!) {\n    taskById(id: $taskId) {\n      _id\n      description\n      estimatedTime\n      priority\n      review\n      status\n      timeSpent\n      title\n      untilDate\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TasksByKeywordAndFilters($keyword: String!, $filters: Filters!) {\n    tasksByKeywordAndFilters(keyword: $keyword, filters: $filters) {\n      _id\n      description\n      estimatedTime\n      priority\n      review\n      status\n      timeSpent\n      title\n      untilDate\n    }\n  }\n"): (typeof documents)["\n  query TasksByKeywordAndFilters($keyword: String!, $filters: Filters!) {\n    tasksByKeywordAndFilters(keyword: $keyword, filters: $filters) {\n      _id\n      description\n      estimatedTime\n      priority\n      review\n      status\n      timeSpent\n      title\n      untilDate\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    subscription taskCreated($keyword: String, $filters: Filters) {\n    taskCreated(keyword: $keyword, filters: $filters)\n    }\n"): (typeof documents)["\n    subscription taskCreated($keyword: String, $filters: Filters) {\n    taskCreated(keyword: $keyword, filters: $filters)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    subscription taskUpdated($keyword: String, $filters: Filters) {\n        taskUpdated(keyword: $keyword, filters: $filters)\n    }\n"): (typeof documents)["\n    subscription taskUpdated($keyword: String, $filters: Filters) {\n        taskUpdated(keyword: $keyword, filters: $filters)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    subscription taskDeleted {\n        taskDeleted\n    }\n"): (typeof documents)["\n    subscription taskDeleted {\n        taskDeleted\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;