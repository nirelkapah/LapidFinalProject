import { Task } from "../model/task";

export const createTaskObjectFromServer = (task: Task) => {
    return {
        _id: task._id,
        description: task.description,
        status: task.status,
        title: task.title,
        estimatedTime: task.estimatedTime,
        priority: task.priority,
        timeSpent: task.status === 'Closed' ? task.timeSpent : null,
        untilDate: task.status === 'Urgent' || task.status === 'Closed' ?
            task.untilDate :
            null,
        review: task.status === 'Closed' ? task.review : null
    }
}