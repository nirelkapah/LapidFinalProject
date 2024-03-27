
import {tasksCollection} from '../../models/task';
import { TaskResponse } from '../../models/taskResponse';
import {QueryTaskByIdArgs, QueryTaskByIdKeywordAndFiltersArgs, QueryTasksByKeywordAndFiltersArgs} from "../../../task-project/src/gql/graphql";
import { ObjectId } from 'mongodb';

export const priorityList = ['Top', 'Regular', 'Minor'];
export const statusList = ['Open', 'Closed', 'Urgent']

export const queryResolvers = {
    Query:{

          taskById: async (_: any, args: QueryTaskByIdArgs) => {
            try {
              const taskId: string = args.id;
              console.log('ARGS: ', args)
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
              .find({ "status": { "$in": filters.some(filter => statusList.includes(filter ? filter : '')) ? filters : statusList } })
              .find({ "priority": { "$in": filters.some(filter => priorityList.includes(filter ? filter : '')) ? filters : priorityList } })
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
          .find({ "status": { "$in": filters.some(filter => statusList.includes(filter ? filter : '')) ? filters : statusList } })
          .find({ "priority": { "$in": filters.some(filter => priorityList.includes(filter ? filter : '')) ? filters : priorityList } })
          
          return tasks.map((task: any) => {
            return { ...task._doc, _id: task.id };
          });

          } catch (err) {
            throw err;
          }
        },

            

    }
}