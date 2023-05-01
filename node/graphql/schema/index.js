const { buildSchema } = require('graphql')

module.exports = buildSchema(`

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


type RootQuery {
    tasks: [Task!]!
    tasksByKeyword(keyword: String): [Task!]! 
}

type RootMutation {
    createTask(taskInput: TaskInput): Task
    deleteTask(_id: String!): Task
    updateTask(taskInput: TaskInput): Task


}

schema {
    query: RootQuery
    mutation: RootMutation
}

`)