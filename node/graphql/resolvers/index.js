const tasksCollection = require("../../models/task");
const Task = require("../../models/task");
const ConversionUtils = require("../../utls/conversionUtils");
const {
  openTaskAuthSchema,
  closedTaskAuthSchema,
  UrgentTaskAuthSchema,
} = require("../../utls/TaskValidation");

module.exports = {

  //Get All Tasks
  tasks: async () => {
    try {
      const tasks = await tasksCollection.find();

      return tasks.map((task) => {
        return { ...task._doc, _id: task.id };
      });

    } catch (err) {
      throw err;
    }
  },

  //Get Tasks By Keyword (Search)
  tasksByKeyword: async (args) => {
    try {
      let reg = new RegExp(args.keyword, "i");

      const tasks = await tasksCollection.find({
        $or: [
          { title: reg },
          { priority: reg },
          { description: reg },
          { status: reg },
          { review: reg },
        ],
      });

      return tasks.map((task) => {
        return { ...task._doc, _id: task.id };
      });

    } catch (err) {
      throw err;
    }
  },

  //Create New Task
  createTask: async (args) => {
    try {

      if (args.taskInput.status === "Open") {
        await openTaskAuthSchema.validateAsync(args.taskInput);
      } else if (args.taskInput.status === "Urgent") {
        await UrgentTaskAuthSchema.validateAsync(args.taskInput);
      } else if (args.taskInput.status === "Closed") {
        await closedTaskAuthSchema.validateAsync(args.taskInput);
      }

      if (args.taskInput.timeSpent) {
        args.taskInput.timeSpent = ConversionUtils.convertTimeSpentToDB(
          +args.taskInput.timeSpent
        );
      }

      const task = new Task({
        title: args.taskInput.title,
        description: args.taskInput.description,
        estimatedTime: Number.parseFloat(+args.taskInput.estimatedTime),
        status: args.taskInput.status,
        priority: args.taskInput.priority,
        untilDate: args.taskInput.untilDate,
        review: args.taskInput.review,
        timeSpent: args.taskInput.timeSpent,
      });

      const result = await task.save();

      createdTask = { ...result._doc, _id: task.id, untilDate: task.untilDate };
      return createdTask;

    } catch (err) {
      throw err;
    }
  },

  //Delete Task
  deleteTask: async (args) => {
    try {

      await tasksCollection.findOneAndRemove({ _id: args._id });

      return null;
    } catch (err) {
      throw err;
    }
  },

  //Update Existing Task
  updateTask: async (args) => {
    try {

      if (args.taskInput.status === "Open") {
        await openTaskAuthSchema.validateAsync(args.taskInput);
      } else if (args.taskInput.status === "Urgent") {
        await UrgentTaskAuthSchema.validateAsync(args.taskInput);
      } else if (args.taskInput.status === "Closed") {
        await closedTaskAuthSchema.validateAsync(args.taskInput);
      }

      if (args.taskInput.timeSpent) {
        args.taskInput.timeSpent = ConversionUtils.convertTimeSpentToDB(
          +args.taskInput.timeSpent
        );
      }

      const result = await tasksCollection.findOneAndUpdate(
        { _id: args.taskInput._id },
        {
          $set: {
            title: args.taskInput.title,
            description: args.taskInput.description,
            estimatedTime: Number.parseFloat(+args.taskInput.estimatedTime),
            status: args.taskInput.status,
            priority: args.taskInput.priority,
            untilDate: args.taskInput.untilDate,
            review: args.taskInput.review,
            timeSpent: args.taskInput.timeSpent,
          },
        },
        { new: true }
      );

      updatedTask = { ...result._doc, _id: args.taskInput.id };
      return result;

    } catch (err) {
      throw err;
    }
  },
};
