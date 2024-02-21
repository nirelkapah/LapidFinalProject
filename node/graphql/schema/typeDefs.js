// const { buildSchema } = require("graphql");
const {gql} = require('apollo-server');

module.exports = gql`

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


type Query {
    tasks: [Task!]!
    tasksByKeyword(keyword: String): [Task!]! 
}

type Mutation {
    createTask(taskInput: TaskInput): Task
    deleteTask(_id: String!): Task
    updateTask(taskInput: TaskInput): Task

}

type Subscription {
    taskCreated: Task
}

`;
