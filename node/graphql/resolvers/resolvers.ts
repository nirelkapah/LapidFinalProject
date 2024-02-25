// const {subscribe} = require("graphql");
const tasksCollection = require("../../models/task");
const Task = require("../../models/task");
const ConversionUtils = require("../../utls/conversionUtils");
const {
  openTaskAuthSchema,
  closedTaskAuthSchema,
  UrgentTaskAuthSchema,
} = require("../../utls/TaskValidation");
const {PubSub} = require("graphql-subscriptions");

const pubsub = new PubSub();

interface TaskResponse { 
  id: string, 
  title : string 
  description: string,
  estimatedTime: number, 
  status: string,
  priority: string,
  untilDate: String,
  review: String,
  timeSpent: number,
  _doc: object
}

module.exports = {
    Query:{
        
        tasks: async () => {
            try {
                const tasks = await tasksCollection.find();
          
                return tasks.map((task: TaskResponse) => {
                  return { ...task._doc, _id: task.id };
                });
          
              } catch (err) {
                throw err;
              }
        },

        //Get Tasks By Keyword Search and Filters
        tasksByKeywordAndFilters: async (_: any, args: any) => {

          try {
          let reg = new RegExp(args.keyword, "i");
          const statusFilters: [string] = args.filters.status;
          const priorityFilters: [string] = args.filters.priority;

          const tasks = await tasksCollection.find({
              $or: [
              { title: reg },
              { priority: reg },
              { description: reg },
              { status: reg },
              { review: reg },
              ],
          })
          .find({ "status": { "$in": statusFilters.length > 0 ? statusFilters : ['Open' , 'Closed' , 'Urgent'] } })
          .find({ "priority": { "$in": priorityFilters.length > 0 ? priorityFilters : ['Top' , 'Regular' , 'Minor'] } })
          ;

          return tasks.map((task: TaskResponse) => {
              return { ...task._doc, _id: task.id };
          });

          } catch (err) {
          throw err;
          }
      },

            

    },

    Mutation: {

        createTask: async (_: any, args: any) => {
            try {
        
              //Validations
              if (args.taskInput.status === "Open") {
                await openTaskAuthSchema.validateAsync(args.taskInput);
              } else if (args.taskInput.status === "Urgent") {
                await UrgentTaskAuthSchema.validateAsync(args.taskInput);
              } else if (args.taskInput.status === "Closed") {
                await closedTaskAuthSchema.validateAsync(args.taskInput);
              }
        
              //Convert Type
              if (args.taskInput.timeSpent) {
                args.taskInput.timeSpent = ConversionUtils.convertTimeSpentToDB(
                  +args.taskInput.timeSpent
                );
              }
        
              //Create Task Object
              const task = new Task({
                title: args.taskInput.title,
                description: args.taskInput.description,
                // estimatedTime: Number.parseFloat(+args.taskInput.estimatedTime),
                estimatedTime:args.taskInput.estimatedTime,
                status: args.taskInput.status,
                priority: args.taskInput.priority,
        
              });
        
              if(args.taskInput.status === 'Urgent' || args.taskInput.status === 'Closed'){
                task.untilDate = args.taskInput.untilDate;
              }
        
              if(args.taskInput.status === 'Closed'){
                task.review = args.taskInput.review;
                task.timeSpent = args.taskInput.timeSpent;
              }
        
              //Push New Task
              const result = await task.save();
        
              const createdTask = { ...result._doc, _id: task.id, untilDate: task.untilDate };

              pubsub.publish('TASK_CREATED', {
                taskCreated: createdTask
              });

              return createdTask;
        
            } catch (err) {
              throw err;
            }
          },
        
          //Delete Task
          deleteTask: async (_: any, args: any) => {
            try {
        
              await tasksCollection.findOneAndRemove({ _id: args._id });

              pubsub.publish('TASK_DELETED', {
                taskDeleted: args._id
              });
        
              return null;
            } catch (err) {
              throw err;
            }
          },
        
          //Update Existing Task
          updateTask: async (_: any, args: any) => {
            try {
              //Validations
              if (args.taskInput.status === "Open") {
                await openTaskAuthSchema.validateAsync(args.taskInput);
              } else if (args.taskInput.status === "Urgent") {
                await UrgentTaskAuthSchema.validateAsync(args.taskInput);
              } else if (args.taskInput.status === "Closed") {
                await closedTaskAuthSchema.validateAsync(args.taskInput);
              }
        
              //Covert Data
              if (args.taskInput.timeSpent) {
                args.taskInput.timeSpent = ConversionUtils.convertTimeSpentToDB(
                  +args.taskInput.timeSpent
                );
              }
        
              let result;
        
              //If Open Task
              if(args.taskInput.status === 'Open'){

                result = await tasksCollection.findOneAndUpdate(
                  { _id: args.taskInput._id },
                  {
                    $set: {
                      title: args.taskInput.title,
                      description: args.taskInput.description,
                      // estimatedTime: Number.parseFloat(+args.taskInput.estimatedTime),
                      estimatedTime: args.taskInput.estimatedTime,
                      status: args.taskInput.status,
                      priority: args.taskInput.priority,
                    },
                    $unset: {untilDate:1, review:1, timeSpent:1}
                  },
                  { new: true }
                );
              }
        
              //If Urgent Task
              else if(args.taskInput.status === 'Urgent'){

                result = await tasksCollection.findOneAndUpdate(
                  { _id: args.taskInput._id },
                  {
                    $set: {
                      title: args.taskInput.title,
                      description: args.taskInput.description,
                      estimatedTime: args.taskInput.estimatedTime,
                      // estimatedTime: Number.parseFloat(+args.taskInput.estimatedTime),
                      status: args.taskInput.status,
                      priority: args.taskInput.priority,
                      untilDate: args.taskInput.untilDate,
                    },
                    $unset: {review:1, timeSpent:1}
                  },
                  { new: true }
                );
              }
        
              //If Closed Task
              else if(args.taskInput.status === 'Closed'){

                result = await tasksCollection.findOneAndUpdate(
                  { _id: args.taskInput._id },
                  {
                    $set: {
                      title: args.taskInput.title,
                      description: args.taskInput.description,
                      estimatedTime:+args.taskInput.estimatedTime,
                      // estimatedTime: Number.parseFloat(+args.taskInput.estimatedTime),
                      status: args.taskInput.status,
                      priority: args.taskInput.priority,
                      untilDate: args.taskInput.untilDate,
                      review: args.taskInput.review,
                      timeSpent: args.taskInput.timeSpent,
                    },
                  },
                  { new: true }
                );
              }
              const updatedTask = { ...result._doc, _id: args.taskInput.id };

              pubsub.publish('TASK_UPDATED', {
                taskUpdated: updatedTask
              });


              return result;
        
            } catch (err) {
              throw err;
            }
          },

    },

    Subscription: {
        taskCreated: {
            subscribe: () => pubsub.asyncIterator('TASK_CREATED')
        },

        taskDeleted: {
            subscribe: () => pubsub.asyncIterator('TASK_DELETED')
        },

        taskUpdated: {
            subscribe: () => pubsub.asyncIterator('TASK_UPDATED')
        }
    } 
}