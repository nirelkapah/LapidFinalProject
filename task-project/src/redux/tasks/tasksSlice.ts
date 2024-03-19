

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
      let temporaryTasksList = [...state.tasks];
      let removeIndex = temporaryTasksList.map((task) => task._id).indexOf(action.payload);
      removeIndex !== -1 &&
      temporaryTasksList.splice(removeIndex, 1);
      state.tasks = temporaryTasksList;
    },

    modifiedTask: (state: tasksState, action: PayloadAction<string>) => {
        console.log('Updated / Created Task : ', action.payload); 
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



  },
});

export const {

  removeTask,
  setTasks,
  modifiedTask,
  setTasksError,
  setTasksLoading

} = tasksSlice.actions;

export default tasksSlice.reducer;
