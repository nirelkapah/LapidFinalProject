const Task = require('../../models/task')
const ConversionUtils = require('../../utls/conversionUtils')



module.exports = {

    tasks: async () => { 
        try {
            const tasks = await Task.find()

            if(tasks.untilDate){
                tasks.untilDate = ConversionUtils.convertDateFromDB(task._doc.untilDate)
            }

            return tasks
            .map(task => {
               return {...task._doc, _id: task.id, untilDate: task.untilDate }}
           )

        }catch (err) {
            throw err
        }
    },

    createTask: async (args) => { //what happens when i use mutation > createEvents
            try {

                if(args.taskInput.untilDate){
                    args.taskInput.untilDate = ConversionUtils.convertDateToDB(args.taskInput.untilDate)
                }

                if(args.taskInput.timeSpent){
                    args.taskInput.untilDate = ConversionUtils.convertTimeSpentToDB(+args.taskInput.timeSpent)
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

                if(task.untilDate){
                    task.untilDate = ConversionUtils.convertDateFromDB(task._doc.untilDate)

                }

                createdTask = {...result._doc, _id: task.id, untilDate: task.untilDate};
                return createdTask

            } catch (err) {
                throw err
            }
            
    }
}