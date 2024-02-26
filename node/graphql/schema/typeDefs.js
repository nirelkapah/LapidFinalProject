"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var gql = require('apollo-server').gql;
module.exports = gql(__makeTemplateObject(["\n\ninput TaskInput {\n    _id :String\n    title :String! \n    description: String! \n    estimatedTime: Float! \n    status: String! \n    priority: String!\n    untilDate: String\n    review: String\n    timeSpent: Float\n}\n\ntype Task { \n    _id: String! \n    title :String! \n    description: String! \n    estimatedTime: Float! \n    status: String! \n    priority: String!\n    untilDate: String\n    review: String\n    timeSpent: Float\n}\n\ninput Filters { \n    status: [String]\n    priority: [String]\n}\n\ntype Query {\n    tasks: [Task!]!\n    tasksByKeywordAndFilters(keyword: String, filters: Filters): [Task!]\n}\n\ntype Mutation {\n    createTask(taskInput: TaskInput): Task\n    deleteTask(_id: String!): Task\n    updateTask(taskInput: TaskInput): Task\n\n}\n\ntype Subscription {\n    taskCreated: Task\n    taskDeleted: String\n    taskUpdated: Task\n}\n\n"], ["\n\ninput TaskInput {\n    _id :String\n    title :String! \n    description: String! \n    estimatedTime: Float! \n    status: String! \n    priority: String!\n    untilDate: String\n    review: String\n    timeSpent: Float\n}\n\ntype Task { \n    _id: String! \n    title :String! \n    description: String! \n    estimatedTime: Float! \n    status: String! \n    priority: String!\n    untilDate: String\n    review: String\n    timeSpent: Float\n}\n\ninput Filters { \n    status: [String]\n    priority: [String]\n}\n\ntype Query {\n    tasks: [Task!]!\n    tasksByKeywordAndFilters(keyword: String, filters: Filters): [Task!]\n}\n\ntype Mutation {\n    createTask(taskInput: TaskInput): Task\n    deleteTask(_id: String!): Task\n    updateTask(taskInput: TaskInput): Task\n\n}\n\ntype Subscription {\n    taskCreated: Task\n    taskDeleted: String\n    taskUpdated: Task\n}\n\n"]));