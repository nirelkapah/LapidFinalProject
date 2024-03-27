

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../../model/task";
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
      state.tasks.push(action.payload)
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
