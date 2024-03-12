
import {tasksCollection} from '../../models/task'
import {openTaskAuthSchema, closedTaskAuthSchema, UrgentTaskAuthSchema} from '../../utls/TaskValidation'
import {MutationCreateTaskArgs, MutationDeleteTaskArgs, MutationUpdateTaskArgs, Task} from "../../../task-project/src/gql/graphql";
import { TaskResponse } from '../../models/taskResponse';
import {pubsub} from './subscriptions.resolver.ts'

export const mutationResolvers = {

    Mutation: {

        createTask: async (_: any, args: MutationCreateTaskArgs) => {
            try {
        
              args.taskInput.status === "Open" ? await openTaskAuthSchema.validateAsync(args.taskInput) :
              args.taskInput.status === "Urgent" ? await UrgentTaskAuthSchema.validateAsync(args.taskInput) :
              args.taskInput.status === "Closed" && await closedTaskAuthSchema.validateAsync(args.taskInput)
        
              const task = new tasksCollection({
                title: args.taskInput.title,
                description: args.taskInput.description,
                estimatedTime:args.taskInput.estimatedTime,
                status: args.taskInput.status,
                priority: args.taskInput.priority
              });

              args.taskInput.status === 'Closed' &&  (task.review = args.taskInput.review);
              args.taskInput.status === 'Closed' && (task.timeSpent = args.taskInput.timeSpent);
              (args.taskInput.status === 'Closed' || args.taskInput.status === 'Urgent') && (task.untilDate = args.taskInput.untilDate);
        
              const result: any = await task.save();
        
              const createdTask: TaskResponse = {...result._doc, _id: task.id};
              pubsub.publish('TASK_CREATED', {
                taskCreated: createdTask._id
              });

              return result;
        
            } catch (err) {
              throw err;
            }
          },
        
          deleteTask: async (_: any, args: MutationDeleteTaskArgs) => {
            try {

             await tasksCollection.findOneAndRemove({ _id: args._id });

             await pubsub.publish('TASK_DELETED', {
              taskDeleted: args._id
            });
        
              return null;
            } catch (err) {
              throw err;
            }
          },
        
          //Update Existing Task
          updateTask: async (_: any, args: MutationUpdateTaskArgs) => {
            try {

              if (args.taskInput.status === "Open") {
                await openTaskAuthSchema.validateAsync(args.taskInput);
              } else if (args.taskInput.status === "Urgent") {
                await UrgentTaskAuthSchema.validateAsync(args.taskInput);
              } else if (args.taskInput.status === "Closed") {
                await closedTaskAuthSchema.validateAsync(args.taskInput);
              }

              const task = new tasksCollection({
                _id: args.taskInput._id,
                title: args.taskInput.title,
                description: args.taskInput.description,
                estimatedTime:args.taskInput.estimatedTime,
                status: args.taskInput.status,
                priority: args.taskInput.priority
              });

              args.taskInput.status === 'Closed' &&  (task.review = args.taskInput.review);
              args.taskInput.status === 'Closed' && (task.timeSpent = args.taskInput.timeSpent);
              (args.taskInput.status === 'Closed' || args.taskInput.status === 'Urgent') && (task.untilDate = args.taskInput.untilDate);

              let unSetFields: Partial<Task> = (
              (task.status === 'Open') ? ({untilDate: '', review: '', timeSpent: 0}) :
              (task.status === 'Urgent') ? ({review: '', timeSpent: 0}) : {}
              )

              let result: any;

              result = await tasksCollection.findOneAndUpdate(
                { _id: task._id },
                {
                  $set: task,
                  $unset: unSetFields
                },
                { new: true }
              );

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