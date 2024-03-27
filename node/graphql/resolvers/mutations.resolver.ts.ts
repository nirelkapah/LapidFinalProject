
import {tasksCollection} from '../../models/task'
import {openTaskAuthSchema, closedTaskAuthSchema, UrgentTaskAuthSchema} from '../../utls/TaskValidation'
import {MutationCreateTaskArgs, MutationDeleteTaskArgs, MutationUpdateTaskArgs, Task} from "../../../task-project/src/gql/graphql";
import {pubsub} from './subscriptions.resolver.ts'
import { TaskResponse } from '../../models/taskResponse';
import { Maybe } from 'graphql/jsutils/Maybe';

// import { Priority, Status } from '../../../task-project/src/gql/graphql';
enum Priority {
  Top = 'Top',
  Regular = 'Regular',
  Minor = 'Minor'
}

enum Status {
  Open = 'Open',
  Closed = 'Closed',
  Urgent = 'Urgent'
}


export const mutationResolvers = {

    Mutation: {

        createTask: async (_: any, args: MutationCreateTaskArgs) => {
            try {
        
              args.taskInput.status === Status.Open ? await openTaskAuthSchema.validateAsync(args.taskInput) :
              args.taskInput.status === Status.Urgent ? await UrgentTaskAuthSchema.validateAsync(args.taskInput) :
              args.taskInput.status === Status.Closed && await closedTaskAuthSchema.validateAsync(args.taskInput)
        
              const task = new tasksCollection({
                title: args.taskInput.title,
                description: args.taskInput.description,
                estimatedTime:args.taskInput.estimatedTime,
                status: args.taskInput.status,
                priority: args.taskInput.priority
              });

              args.taskInput.status === Status.Closed &&  (task.review = args.taskInput.review);
              args.taskInput.status === Status.Closed && (task.timeSpent = args.taskInput.timeSpent);
              (args.taskInput.status === Status.Closed || args.taskInput.status === Status.Urgent) && (task.untilDate = args.taskInput.untilDate);
              const result: any = await task.save();
        
              const createdTask: Task = {...result._doc, _id: task.id};
              pubsub.publish('TASK_CREATED', {
                taskCreated: result
              });

              return result;
        
            } catch (err) {
              throw err;
            }
          },
        
          deleteTask: async (_: any, args: MutationDeleteTaskArgs) => {
            try {

             const result: Maybe<TaskResponse> = await tasksCollection.findOneAndRemove({ _id: args._id });

             await pubsub.publish('TASK_DELETED', {
              taskDeleted: result
            });

              return result;
            } catch (err) {
              throw err;
            }
          },
        
          //Update Existing Task
          updateTask: async (_: any, args: MutationUpdateTaskArgs) => {
            try {

              args.taskInput.status === Status.Open ? await openTaskAuthSchema.validateAsync(args.taskInput) :
              args.taskInput.status === Status.Urgent ? await UrgentTaskAuthSchema.validateAsync(args.taskInput) :
              args.taskInput.status === Status.Closed && await closedTaskAuthSchema.validateAsync(args.taskInput)

              const task = new tasksCollection({
                _id: args.taskInput._id,
                title: args.taskInput.title,
                description: args.taskInput.description,
                estimatedTime:args.taskInput.estimatedTime,
                status: args.taskInput.status,
                priority: args.taskInput.priority
              });

              args.taskInput.status === Status.Closed &&  (task.review = args.taskInput.review);
              args.taskInput.status === Status.Closed && (task.timeSpent = args.taskInput.timeSpent);
              (args.taskInput.status === Status.Closed || args.taskInput.status === Status.Urgent) && (task.untilDate = args.taskInput.untilDate);

              let unSetFields: Partial<Task> = (
              (task.status === Status.Open) ? ({untilDate: '', review: '', timeSpent: 0}) :
              (task.status === Status.Urgent) ? ({review: '', timeSpent: 0}) : {}
              )

              let result: Maybe<TaskResponse>;

              result = await tasksCollection.findOneAndUpdate(
                { _id: task._id },
                {
                  $set: task,
                  $unset: unSetFields
                },
                { new: true }
              );

              pubsub.publish('TASK_UPDATED', {
                taskUpdated: args.taskInput._id,
                filterCondition: true
              });

              return result;
        
            } catch (err) {
              throw err;
            }
          },

    },
}