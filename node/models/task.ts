import { Schema, model, connect } from 'mongoose';
interface TaskInterface {
  title: string;
  description: string;
  estimatedTime: number;
  status: string;
  priority: string;
  untilDate?: string;
  review?: string;
  timeSpent?: number;
}

export const taskSchema = new Schema<TaskInterface>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  estimatedTime: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  untilDate: {
    //for Urgent & Closed Tasks
    type: String,
    required: false,
  },
  review: {
    // for closed Tasks
    type: String,
    required: false,
  },
  timeSpent: {
    // for closed tasks
    type: Number,
    required: false,
  },
});

export const tasksCollection = model<TaskInterface>('Task', taskSchema)


