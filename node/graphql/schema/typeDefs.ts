import {gql} from 'apollo-server'

export const typeDefs = gql`

input TaskInput {
    _id :String
    title :String! 
    description: String! 
    estimatedTime: Float! 
    status: String! 
    priority: String!
    untilDate: String
    review: String
    timeSpent: Float
}

type Task { 
    _id: String! 
    title :String! 
    description: String! 
    estimatedTime: Float! 
    status: String! 
    priority: String!
    untilDate: String
    review: String
    timeSpent: Float
}

enum Priority{
    Top
    Regular
    Minor
}

enum Status{
    Open
    Urgent
    Closed
}

type Query {
    taskById(id: String!): Task
    taskByIdKeywordAndFilters(id: String!,keyword: String, filters: [String]): Task
    tasksByKeywordAndFilters(keyword: String, filters: [String]): [Task]
}

type Mutation {
    createTask(taskInput: TaskInput!): Task
    deleteTask(_id: String!): Task
    updateTask(taskInput: TaskInput!): Task

}

type Subscription {
    taskCreated(keyword: String, filters: [String]): String
    taskUpdated: String
    taskDeleted(keyword: String, filters: [String]): String
}

`;
