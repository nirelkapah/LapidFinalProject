"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasksCollection = exports.taskSchema = void 0;
var mongoose_1 = require("mongoose");
exports.taskSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    estimatedTime: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        required: true,
    },
    untilDate: {
        //for Urgent & Closed Tasks
        type: String,
        required: false,
    },
    review: {
        // for closed Tasks
        type: String,
        required: false,
    },
    timeSpent: {
        // for closed tasks
        type: Number,
        required: false,
    },
});
exports.tasksCollection = (0, mongoose_1.model)('Task', exports.taskSchema);
