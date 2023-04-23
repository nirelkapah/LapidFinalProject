import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {Task} from '../../model/task'
import type { RootState, AppDispatch } from '../store'


// Defines Global State
export interface TasksState {
  tasksArray: Task[]
}

// Define the initial state using that type
const initialState: TasksState = {
  tasksArray: [] ,
}

export const tasksSlice = createSlice({
  name: 'tasksArray',
  initialState,
  reducers: {

    // Use the PayloadAction type to declare the contents of `action.payload`
    updateAlltasks: (state, action: PayloadAction<Task[]>) => {
      state.tasksArray = action.payload;

    },
  },
})

export const { updateAlltasks } = tasksSlice.actions

export default tasksSlice.reducer