const tasksCollection = require('../../models/task')
const Task = require('../../models/task')
const ConversionUtils = require('../../utls/conversionUtils')
const {openTaskAuthSchema, urgentTaskAuthSchema, closedTaskAuthSchema} = require('../../utls/TaskValidation')



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

    tasksByKeyword: async (args) => { 
        try {
            console.log(args.keyword);
            let reg = new RegExp(args.keyword, 'i');

            const tasks = await tasksCollection.find({
                $or: [
                  { title: reg },
                  { priority: reg },
                  { description: reg },
                  { status: reg },
                  { review: reg },
                ]
              });
            // console.log(tasks)
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

                if(args.taskInput.status == 'Open'){
                    await openTaskAuthSchema.validateAsync(args.taskInput);
                }
                else if(args.taskInput.status == 'Urgent'){
                    await urgentTaskAuthSchema.validateAsync(args.taskInput);
                }
                else if(args.taskInput.status == 'Closed'){
                    await closedTaskAuthSchema.validateAsync(args.taskInput);
                }
                

                console.log("THIS DATE GOES INTO DB -")
                console.log(args.taskInput.untilDate)

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
                // if(err.isJoi === true) {
                //     error.status = 422
                // }
                throw err
            }
            
    },

    deleteTask: async (args) => { 
        try {   
                await tasksCollection.findOneAndRemove({"_id": args._id})

                return null;


            } catch (err) {
                throw err
            }
        
},
    updateTask: async (args) => { 
        try {
            
            if(args.taskInput.status == 'Open'){
                await openTaskAuthSchema.validateAsync(args.taskInput);
            }
            else if(args.taskInput.status == 'Urgent'){
                await urgentTaskAuthSchema.validateAsync(args.taskInput);
            }
            else if(args.taskInput.status == 'Closed'){
                await closedTaskAuthSchema.validateAsync(args.taskInput);
            }

            if(args.taskInput.timeSpent){
                args.taskInput.timeSpent = ConversionUtils.convertTimeSpentToDB(+args.taskInput.timeSpent)
            }


            // const task = new Task({
            //     title: args.taskInput.title,
            //     description: args.taskInput.description,
            //     estimatedTime: Number.parseFloat(+args.taskInput.estimatedTime), 
            //     status: args.taskInput.status,
            //     priority: args.taskInput.priority,
            //     untilDate: args.taskInput.untilDate,
            //     review: args.taskInput.review,
            //     timeSpent: args.taskInput.timeSpent, 

            // });
            
            const result = await tasksCollection.findOneAndUpdate({_id: args.taskInput._id},
                {$set:{
                    title: args.taskInput.title,
                    description: args.taskInput.description,
                    estimatedTime: Number.parseFloat(+args.taskInput.estimatedTime), 
                    status: args.taskInput.status,
                    priority: args.taskInput.priority,
                    untilDate: args.taskInput.untilDate,
                    review: args.taskInput.review,
                    timeSpent: args.taskInput.timeSpent
                }},
                {new: true});

            updatedTask = {...result._doc, _id: args.taskInput.id};
            return result

        } catch (err) {
            throw err
        }
        
    },
}