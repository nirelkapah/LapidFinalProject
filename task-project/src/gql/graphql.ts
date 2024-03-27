/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  __typename?: 'Mutation';
  createTask?: Maybe<Task>;
  deleteTask?: Maybe<Task>;
  updateTask?: Maybe<Task>;
};


export type MutationCreateTaskArgs = {
  taskInput: TaskInput;
};


export type MutationDeleteTaskArgs = {
  _id: Scalars['String']['input'];
};


export type MutationUpdateTaskArgs = {
  oldTaskInput: TaskInput;
  taskInput: TaskInput;
};

export enum Priority {
  Minor = 'Minor',
  Regular = 'Regular',
  Top = 'Top'
}

export type Query = {
  __typename?: 'Query';
  taskById?: Maybe<Task>;
  taskByIdKeywordAndFilters?: Maybe<Task>;
  tasksByKeywordAndFilters?: Maybe<Array<Maybe<Task>>>;
};


export type QueryTaskByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryTaskByIdKeywordAndFiltersArgs = {
  filters?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id: Scalars['String']['input'];
  keyword?: InputMaybe<Scalars['String']['input']>;
};


export type QueryTasksByKeywordAndFiltersArgs = {
  filters?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  keyword?: InputMaybe<Scalars['String']['input']>;
};

export enum Status {
  Closed = 'Closed',
  Open = 'Open',
  Urgent = 'Urgent'
}

export type Subscription = {
  __typename?: 'Subscription';
  taskCreated?: Maybe<Scalars['String']['output']>;
  taskDeleted?: Maybe<Scalars['String']['output']>;
  taskUpdated?: Maybe<Scalars['String']['output']>;
};


export type SubscriptionTaskCreatedArgs = {
  filters: Array<InputMaybe<Scalars['String']['input']>>;
  keyword: Scalars['String']['input'];
};


export type SubscriptionTaskDeletedArgs = {
  filters: Array<InputMaybe<Scalars['String']['input']>>;
  keyword: Scalars['String']['input'];
};


export type SubscriptionTaskUpdatedArgs = {
  filters: Array<InputMaybe<Scalars['String']['input']>>;
  keyword: Scalars['String']['input'];
};

export type Task = {
  __typename?: 'Task';
  _id: Scalars['String']['output'];
  description: Scalars['String']['output'];
  estimatedTime: Scalars['Float']['output'];
  priority: Scalars['String']['output'];
  review?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  timeSpent?: Maybe<Scalars['Float']['output']>;
  title: Scalars['String']['output'];
  untilDate?: Maybe<Scalars['String']['output']>;
};

export type TaskInput = {
  _id?: InputMaybe<Scalars['String']['input']>;
  description: Scalars['String']['input'];
  estimatedTime: Scalars['Float']['input'];
  priority: Scalars['String']['input'];
  review?: InputMaybe<Scalars['String']['input']>;
  status: Scalars['String']['input'];
  timeSpent?: InputMaybe<Scalars['Float']['input']>;
  title: Scalars['String']['input'];
  untilDate?: InputMaybe<Scalars['String']['input']>;
};

export type CreateTaskMutationVariables = Exact<{
  taskInput: TaskInput;
}>;


export type CreateTaskMutation = { __typename?: 'Mutation', createTask?: { __typename?: 'Task', _id: string, description: string, estimatedTime: number, priority: string, review?: string | null, status: string, timeSpent?: number | null, title: string, untilDate?: string | null } | null };

export type UpdateTaskMutationVariables = Exact<{
  taskInput: TaskInput;
  oldTaskInput: TaskInput;
}>;


export type UpdateTaskMutation = { __typename?: 'Mutation', updateTask?: { __typename?: 'Task', _id: string, description: string, estimatedTime: number, priority: string, review?: string | null, status: string, timeSpent?: number | null, title: string, untilDate?: string | null } | null };

export type DeleteTaskMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteTaskMutation = { __typename?: 'Mutation', deleteTask?: { __typename?: 'Task', _id: string } | null };

export type TaskByIdQueryVariables = Exact<{
  taskId: Scalars['String']['input'];
}>;


export type TaskByIdQuery = { __typename?: 'Query', taskById?: { __typename?: 'Task', _id: string, description: string, estimatedTime: number, priority: string, review?: string | null, status: string, timeSpent?: number | null, title: string, untilDate?: string | null } | null };

export type TaskByIdKeywordAndFiltersQueryVariables = Exact<{
  taskByIdKeywordAndFiltersId: Scalars['String']['input'];
  keyword?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
}>;


export type TaskByIdKeywordAndFiltersQuery = { __typename?: 'Query', taskByIdKeywordAndFilters?: { __typename?: 'Task', _id: string, description: string, estimatedTime: number, priority: string, review?: string | null, status: string, timeSpent?: number | null, title: string, untilDate?: string | null } | null };

export type TasksByKeywordAndFiltersQueryVariables = Exact<{
  keyword: Scalars['String']['input'];
  filters: Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>;
}>;


export type TasksByKeywordAndFiltersQuery = { __typename?: 'Query', tasksByKeywordAndFilters?: Array<{ __typename?: 'Task', _id: string, description: string, estimatedTime: number, priority: string, review?: string | null, status: string, timeSpent?: number | null, title: string, untilDate?: string | null } | null> | null };

export type TaskCreatedSubscriptionVariables = Exact<{
  keyword: Scalars['String']['input'];
  filters: Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>;
}>;


export type TaskCreatedSubscription = { __typename?: 'Subscription', taskCreated?: string | null };

export type TaskUpdatedSubscriptionVariables = Exact<{
  keyword: Scalars['String']['input'];
  filters: Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>;
}>;


export type TaskUpdatedSubscription = { __typename?: 'Subscription', taskUpdated?: string | null };

export type TaskDeletedSubscriptionVariables = Exact<{
  keyword: Scalars['String']['input'];
  filters: Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>;
}>;


export type TaskDeletedSubscription = { __typename?: 'Subscription', taskDeleted?: string | null };


export const CreateTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TaskInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"taskInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"estimatedTime"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"review"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"timeSpent"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"untilDate"}}]}}]}}]} as unknown as DocumentNode<CreateTaskMutation, CreateTaskMutationVariables>;
export const UpdateTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TaskInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"oldTaskInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TaskInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"taskInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskInput"}}},{"kind":"Argument","name":{"kind":"Name","value":"oldTaskInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"oldTaskInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"estimatedTime"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"review"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"timeSpent"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"untilDate"}}]}}]}}]} as unknown as DocumentNode<UpdateTaskMutation, UpdateTaskMutationVariables>;
export const DeleteTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<DeleteTaskMutation, DeleteTaskMutationVariables>;
export const TaskByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TaskById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"taskById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"estimatedTime"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"review"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"timeSpent"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"untilDate"}}]}}]}}]} as unknown as DocumentNode<TaskByIdQuery, TaskByIdQueryVariables>;
export const TaskByIdKeywordAndFiltersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TaskByIdKeywordAndFilters"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskByIdKeywordAndFiltersId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"keyword"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"taskByIdKeywordAndFilters"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskByIdKeywordAndFiltersId"}}},{"kind":"Argument","name":{"kind":"Name","value":"keyword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"keyword"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"estimatedTime"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"review"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"timeSpent"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"untilDate"}}]}}]}}]} as unknown as DocumentNode<TaskByIdKeywordAndFiltersQuery, TaskByIdKeywordAndFiltersQueryVariables>;
export const TasksByKeywordAndFiltersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TasksByKeywordAndFilters"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"keyword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tasksByKeywordAndFilters"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"keyword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"keyword"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"estimatedTime"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"review"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"timeSpent"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"untilDate"}}]}}]}}]} as unknown as DocumentNode<TasksByKeywordAndFiltersQuery, TasksByKeywordAndFiltersQueryVariables>;
export const TaskCreatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"taskCreated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"keyword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"taskCreated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"keyword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"keyword"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}]}]}}]} as unknown as DocumentNode<TaskCreatedSubscription, TaskCreatedSubscriptionVariables>;
export const TaskUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"taskUpdated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"keyword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"taskUpdated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"keyword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"keyword"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}]}]}}]} as unknown as DocumentNode<TaskUpdatedSubscription, TaskUpdatedSubscriptionVariables>;
export const TaskDeletedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"taskDeleted"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"keyword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"taskDeleted"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"keyword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"keyword"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}]}]}}]} as unknown as DocumentNode<TaskDeletedSubscription, TaskDeletedSubscriptionVariables>;