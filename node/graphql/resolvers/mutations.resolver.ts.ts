
import {tasksCollection} from '../../models/task'
import * as ConversionUtils from '../../utls/conversionUtils'
// import {PubSub} from 'graphql-subscriptions'
import {openTaskAuthSchema, closedTaskAuthSchema, UrgentTaskAuthSchema} from '../../utls/TaskValidation'
// const pubsub = new PubSub();
import {MutationCreateTaskArgs} from "../../../task-project/src/gql/graphql";
import { TaskResponse } from '../../models/taskResponse';
import {pubsub} from './subscriptions.resolver.ts'

export const mutationResolvers = {

    Mutation: {

        createTask: async (_: any, args: MutationCreateTaskArgs) => {
            try {

              console.log(args)
              console.log(typeof(args.taskInput.timeSpent))
              console.log(typeof(args.taskInput.estimatedTime))

        
              //Validations
              if (args.taskInput.status === "Open") {
                await openTaskAuthSchema.validateAsync(args.taskInput);
              } else if (args.taskInput.status === "Urgent") {
                await UrgentTaskAuthSchema.validateAsync(args.taskInput);
              } else if (args.taskInput.status === "Closed") {
                await closedTaskAuthSchema.validateAsync(args.taskInput);
              }
        
              // Convert Type
              // if (args.taskInput.timeSpent) {
              //   args.taskInput.timeSpent = ConversionUtils.convertTimeSpentToDB(
              //     args.taskInput.timeSpent
              //   );
              // }
        
              //Create Task Object
              const task = new tasksCollection({
                title: args.taskInput.title,
                description: args.taskInput.description,
                // estimatedTime: Number.parseFloat(+args.taskInput.estimatedTime),
                estimatedTime:args.taskInput.estimatedTime,
                status: args.taskInput.status,
                priority: args.taskInput.priority
              });

              args.taskInput.status === 'Closed' &&  (task.review = args.taskInput.review);
              args.taskInput.status === 'Closed' && (task.timeSpent = args.taskInput.timeSpent);
              (args.taskInput.status === 'Closed' || args.taskInput.status === 'Urgent') && (task.untilDate = args.taskInput.untilDate);
        
              // if(args.taskInput.status === 'Urgent' || args.taskInput.status === 'Closed'){
              //   task.untilDate = args.taskInput.untilDate;
              // }
        
              // if(args.taskInput.status === 'Closed'){
              //   task.review = args.taskInput.review;
              //   task.timeSpent = args.taskInput.timeSpent;
              // }
        
              //Push New Task
              const result: any = await task.save();
        
              const createdTask: TaskResponse = {...result._doc, _id: task.id};
              console.log(createdTask)
              pubsub.publish('TASK_CREATED', {
                taskCreated: createdTask._id
              });

              return result;
        
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
                  args.taskInput.timeSpent
                );
              }
        
              let result: any;
        
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
              // const updatedTask = { ...result._doc, _id: args.taskInput.id };
              console.log(args.taskInput._id)
              pubsub.publish('TASK_UPDATED', {
                taskUpdated: args.taskInput._id
              });


              return result;
        
            } catch (err) {
              throw err;
            }
          },

    },
}