const { buildSchema } = require('graphql')

module.exports = buildSchema(`
type Task { 
    _id: ID! 
    title :String! 
    description: String! 
    estimatedTime: Float! 
    status: String! 
    priority: String!
    untilDate: String
    review: String
    timeSpent: Float
}

input TaskInput {
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
}

type RootMutation {
    createTask(taskInput: TaskInput): Task
}

schema {
    query: RootQuery
    mutation: RootMutation
}

`)