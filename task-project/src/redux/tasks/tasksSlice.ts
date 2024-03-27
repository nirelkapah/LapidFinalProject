

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
      const index = state.tasks.findIndex(task => task._id === action.payload);
      index !== -1 && (state.tasks.splice(index, 1));
    },

    addTask: (state: tasksState, action: PayloadAction<Task>) => {
      const fetchedTask = createTaskObjectFromServer(action.payload);
      const index = state.tasks.findIndex(task => task._id === fetchedTask._id);
      index !== -1 ? (state.tasks.splice(index, 1), state.tasks.push(fetchedTask)) :
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
  }}

});

export const {

  removeTask,
  addTask,
  setTasks,
  setTasksError,
  setTasksLoading,

} = tasksSlice.actions;

export default tasksSlice.reducer;
