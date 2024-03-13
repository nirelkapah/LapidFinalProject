
import {tasksCollection} from '../../models/task';
import { TaskResponse } from '../../models/taskResponse';
import {QueryTaskByIdArgs, QueryTaskByIdKeywordAndFiltersArgs, Filters , QueryTasksByKeywordAndFiltersArgs} from "../../../task-project/src/gql/graphql";
import { ObjectId } from 'mongodb';
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

export const queryResolvers = {
    Query:{

          taskById: async (_: any, args: QueryTaskByIdArgs) => {
            try {
              const taskId: string = args.id;
              const result: any = await tasksCollection.findById(taskId)
              const resultId = new ObjectId(result._id)
    
              return {...result._doc,_id: resultId.toString()};
  
            } catch (err) {
              throw err;
            }
          },

          taskByIdKeywordAndFilters: async (_: any, args: QueryTaskByIdKeywordAndFiltersArgs) => {

            try {
              const taskId: string = args.id;
              const reg = new RegExp(args.keyword ? args.keyword : '', "i");
              const filters: Filters = {
                priority: (args.filters?.priority && args.filters?.priority.length > 0 ) ? args.filters?.priority : [Priority.Top , Priority.Regular , Priority.Minor],
                status: (args.filters?.status && args.filters?.status.length > 0) ? args.filters.status : [Status.Open , Status.Closed , Status.Urgent]
              }
              const convertedObjectId = new ObjectId(taskId)
              const result: any = await tasksCollection.find({
              $or: [
              { title: reg },
              { priority: reg },
              { description: reg },
              { status: reg },
              { review: reg },
              ],})
              .find({ "status": { "$in": filters.status } })
              .find({ "priority": { "$in": filters.priority } })
              .findOne({ "_id": convertedObjectId })

              let resultId = undefined;
              result &&  (resultId = new ObjectId(result._id).toString());
              return {...result._doc,_id: resultId};
  
            } catch (err) {
              throw err;
            }
          },

          tasksByKeywordAndFilters: async (_: any, args: QueryTasksByKeywordAndFiltersArgs) => {
          try {
          const reg = new RegExp(args.keyword ? args.keyword : '', "i");
          const filters: Filters = {
            priority: (args.filters?.priority && args.filters?.priority.length > 0 ) ? args.filters?.priority : [Priority.Top , Priority.Regular , Priority.Minor],
            status: (args.filters?.status && args.filters?.status.length > 0) ? args.filters.status : [Status.Open , Status.Closed , Status.Urgent]
          }
          const tasks: TaskResponse[] = await tasksCollection.find({
              $or: [
              { title: reg },
              { priority: reg },
              { description: reg },
              { status: reg },
              { review: reg },
              ],
          })
          .find({ "status": { "$in": filters.status } })
          .find({ "priority": { "$in": filters.priority } })
          
          return tasks.map((task: any) => {
            return { ...task._doc, _id: task.id };
          });

          } catch (err) {
            throw err;
          }
        },

            

    }
}