

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../../model/task";
import {createTaskObjectFromServer} from '../../utils/taskObject'
export interface tasksState {
  tasks: Task[];
  error: boolean;
  loading: boolean;

}

const initialState: tasksState = {
  tasks: [],
  error: false,
  loading: false
};

export const tasksSlice = createSlice({
  name: "tasksSlice",
  initialState,
  reducers: {

    removeTask: (state: tasksState, action: PayloadAction<string>) => {
      const temporaryTasksList = [...state.tasks];
      const removeIndex = temporaryTasksList.findIndex(task => task._id === action.payload);
      removeIndex !== -1 && temporaryTasksList.splice(removeIndex, 1);
      state.tasks = temporaryTasksList;
    },

    addTask: (state: tasksState, action: PayloadAction<Task>) => {

      const fetchedTask = createTaskObjectFromServer(action.payload)

      // const newTask: Task = {
      //   _id: action.payload._id,
      //   title: action.payload.title,
      //   description: action.payload.description,
      //   estimatedTime: action.payload.estimatedTime,
      //   status: action.payload.status,
      //   priority: action.payload.priority
      // }

      console.log('NEW TASK OBJECT REDUX: ', fetchedTask)

      let temporaryTasksList = [...state.tasks];
      let removeIndex = temporaryTasksList.findIndex(task => task._id === fetchedTask._id);
      removeIndex !== -1 ? 
      (temporaryTasksList.splice(removeIndex, 1), 
      temporaryTasksList.push(fetchedTask),
      state.tasks = temporaryTasksList) :
      state.tasks.push(fetchedTask)
    },

    setTasks: (state: tasksState, action: PayloadAction<Task[]>) => {
        state.tasks = action.payload;
        state.error && (state.error = false);
        state.loading && (state.loading = false);
    },

    setTasksError: (state: tasksState, action: PayloadAction<boolean>) => {
        state.error = action.payload
    },

    setTasksLoading: (state: tasksState, action: PayloadAction<boolean>) => {
      state.loading = action.payload
  },

  triggerRefetch: () => {},

  },
});

export const {

  removeTask,
  addTask,
  setTasks,
  triggerRefetch,
  setTasksError,
  setTasksLoading,

} = tasksSlice.actions;

export default tasksSlice.reducer;
