const tasksCollection = require('../../models/task')
const Task = require('../../models/task')
const ConversionUtils = require('../../utls/conversionUtils')



module.exports = {

    tasks: async () => { 
        try {
            const tasks = await tasksCollection.find()

            // if(tasks.untilDate){
            //     tasks.untilDate = ConversionUtils.convertDateFromDB(task._doc.untilDate)
            // }

            return tasks
            .map(task => {
               return {...task._doc, _id: task.id }}
           )

        }catch (err) {
            throw err
        }
    },

    createTask: async (args) => { //what happens when i use mutation > createEvents
            try {
                console.log("THIS DATE GOES INTO DB -")
                console.log(args.taskInput.untilDate)

                // if(args.taskInput.untilDate){
                //     console.log("BEFOR CHANGE")
                //     console.log(args.taskInput.untilDate)
                //     args.taskInput.untilDate = ConversionUtils.convertDateToDB(args.taskInput.untilDate)
                // }

                if(args.taskInput.timeSpent){
                    args.taskInput.timeSpent = ConversionUtils.convertTimeSpentToDB(+args.taskInput.timeSpent)
                }
                
                console.log("AFTER CHANGE")
                console.log(args.taskInput.untilDate)
                console.log(typeof args.taskInput.untilDate)


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

                // if(task.untilDate){
                //     task.untilDate = ConversionUtils.convertDateFromDB(task._doc.untilDate)

                // }

                createdTask = {...result._doc, _id: task.id, untilDate: task.untilDate};
                return createdTask

            } catch (err) {
                throw err
            }
            
    },

    deleteTask: async (args) => { 
        try {   
                console.log(args._id)
                await tasksCollection.findOneAndRemove({"_id": args._id})

                // deletedTask = {...result._doc, _id: tasksCollection.id};
                return null;


            } catch (err) {
                throw err
            }
        
}
}