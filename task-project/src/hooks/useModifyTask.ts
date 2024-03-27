import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Task } from "../model/task";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";



export const useModifyTask = (task?: Task) => {
    const [formTask, setFormTask] = useState<Task>(task ? task : {status:'', description:'', title:'', estimatedTime:0, priority:''} );
    const [FormError, setFormError] = useState("");
    
    useEffect(() => {
        task && setFormTask({
          _id: task._id,
          description: task.description,
          status: task.status,
          title: task.title,
          estimatedTime: task.estimatedTime,
          priority: task.priority,
          timeSpent: task.status === 'Closed' ? task.timeSpent : 0,
          untilDate: task.status === 'Urgent' || task.status === 'Closed' ?
              dayjs.utc(task.untilDate) :
              dayjs.utc(new Date()),
          review: task.status === 'Closed' ? task.review : ''
        })
      }, [task]);

    useEffect(() => {
        
    setFormTask(
        (formTask.status === "Open") ? 
        ({...formTask, review: '', timeSpent: 0, untilDate: dayjs.utc(new Date())}) : 
        (formTask.status === "Urgent") ?
        ({...formTask, review: '', timeSpent: 0}) : {...formTask}
        )

    }, [formTask.status]);

    dayjs.extend(utc);

    return {formTask, setFormTask, FormError, setFormError}

}