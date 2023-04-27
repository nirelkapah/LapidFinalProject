import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {Task} from '../../model/task'
import type { RootState, AppDispatch } from '../store'


// Defines Global State
export interface TasksState {
  tasksArray: Task[],
  taskToDelete: string
}

// Define the initial state using that type
const initialState: TasksState = {
  tasksArray: [] ,
  taskToDelete: ''
}

export const tasksSlice = createSlice({
  name: 'tasksArray',
  initialState,
  reducers: {

    // Use the PayloadAction type to declare the contents of `action.payload`
    updateAlltasks: (state, action: PayloadAction<Task[]>) => {
      state.tasksArray = action.payload;

    },

    addTaskToArray: (state, action: PayloadAction<Task>) => {
      state.tasksArray.push(action.payload) 
    },

    deleteTaskFromArray: (state, action: PayloadAction<string>) => {
      let removeIndex = state.tasksArray.map(task => task._id).indexOf(action.payload);
      ~removeIndex && state.tasksArray.splice(removeIndex, 1)
    },

    updateTaskToDelete: (state, action: PayloadAction<string>) => {
      state.taskToDelete = action.payload
    },

  },
})

export const { updateAlltasks, addTaskToArray, updateTaskToDelete, deleteTaskFromArray} = tasksSlice.actions

export default tasksSlice.reducer