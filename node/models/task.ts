import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const taskSchema = new Schema({
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

module.exports = mongoose.model("Task", taskSchema);
