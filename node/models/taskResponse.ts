
import mongoose from 'mongoose'
import { ObjectId } from 'mongodb'

export interface TaskResponse extends mongoose.Document { 
    _id: ObjectId, 
    title : string 
    description: string,
    estimatedTime: number, 
    status: string,
    priority: string,
    untilDate?: String | undefined,
    review?: String | undefined,
    timeSpent?: number | undefined,
  }