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

input Filters { 
    status: [String]
    priority: [String]
}

type Query {
    tasks: [Task!]!
    tasksByKeywordAndFilters(keyword: String, filters: Filters): [Task]
}

type Mutation {
    createTask(taskInput: TaskInput): Task
    deleteTask(_id: String!): Task
    updateTask(taskInput: TaskInput): Task

}

type Subscription {
    taskCreated: Task
    taskDeleted: String
    taskUpdated: Task
}

`;
