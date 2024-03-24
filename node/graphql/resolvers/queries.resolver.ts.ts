
import {tasksCollection} from '../../models/task';
import { TaskResponse } from '../../models/taskResponse';
import {QueryTaskByIdArgs, QueryTaskByIdKeywordAndFiltersArgs, QueryTasksByKeywordAndFiltersArgs} from "../../../task-project/src/gql/graphql";
import { ObjectId } from 'mongodb';

const priority = ['Top', 'Regular', 'Minor'];
const status = ['Open', 'Closed', 'Urgent']

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
              const filters = args.filters ? args.filters : [];

              const convertedObjectId = new ObjectId(taskId)
              const result: any = await tasksCollection.find({
              $or: [
              { title: reg },
              { priority: reg },
              { description: reg },
              { status: reg },
              { review: reg },
              ],})
              .find({ "status": { "$in": filters.some(filter => status.includes(filter ? filter : '')) ? filters : status } })
              .find({ "priority": { "$in": filters.some(filter => priority.includes(filter ? filter : '')) ? filters : priority } })
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
          const filters = args.filters ? args.filters : [];

          const tasks: TaskResponse[] = await tasksCollection.find({
              $or: [
              { title: reg },
              { priority: reg },
              { description: reg },
              { status: reg },
              { review: reg },
              ],
          })
          .find({ "status": { "$in": filters.some(filter => status.includes(filter ? filter : '')) ? filters : status } })
          .find({ "priority": { "$in": filters.some(filter => priority.includes(filter ? filter : '')) ? filters : priority } })
          
          return tasks.map((task: any) => {
            return { ...task._doc, _id: task.id };
          });

          } catch (err) {
            throw err;
          }
        },

            

    }
}