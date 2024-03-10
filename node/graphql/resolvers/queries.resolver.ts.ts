
import {tasksCollection} from '../../models/task'
import { TaskResponse } from '../../models/taskResponse'

export const queryResolvers = {
    Query:{
        
        tasks: async () => {
            try {
                const tasks: TaskResponse[] = await tasksCollection.find();
                return tasks.map((task: any) => {
                  return { ...task._doc, _id: task.id };
                });
          
              } catch (err) {
                throw err;
              }
          },

          //Get Tasks By Id
          taskById: async (_: any, args: any) => {

            try {
            const taskId: string = args.id;
  
            const result: any = await tasksCollection.findById(taskId)

            return {...result._doc,_id: args.id};
  
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

          const tasks: TaskResponse[] = await tasksCollection.find({
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
          
          return tasks.map((task: any) => {
              return { ...task._doc, _id: task.id };
          });

          } catch (err) {
          throw err;
          }
        },

            

    }
}