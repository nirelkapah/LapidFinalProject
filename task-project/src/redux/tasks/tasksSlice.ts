import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../../model/task";
export interface TasksState {
  tasksArray: Task[];
  taskToDeleteTitle: string;
  filterTaskByTopPriority: boolean;
  filterTaskByOpenStatus: boolean;
  currentTaskId: string;
}

const initialState: TasksState = {
  tasksArray: [],
  taskToDeleteTitle: "",
  filterTaskByTopPriority: false,
  filterTaskByOpenStatus: false,
  currentTaskId: "",
};

export const tasksSlice = createSlice({
  name: "tasksArray",
  initialState,
  reducers: {

    updateAlltasks: (state, action: PayloadAction<Task[]>) => {
      state.tasksArray = action.payload;
    },

    addTaskToArray: (state, action: PayloadAction<Task>) => {
      state.tasksArray.push(action.payload);
    },

    deleteTaskFromArray: (state, action: PayloadAction<string>) => {
      let tamporaryArray = state.tasksArray;
      let removeIndex = tamporaryArray
        .map((task) => task._id)
        .indexOf(action.payload);
      ~removeIndex && tamporaryArray.splice(removeIndex, 1);
      state.tasksArray = tamporaryArray;
    },

    replaceTaskToNewTask: (state, action: PayloadAction<Task>) => {
      let removeIndex = state.tasksArray
        .map((task) => task._id)
        .indexOf(action.payload._id);
      ~removeIndex && state.tasksArray.splice(removeIndex, 1, action.payload);
    },

    updateTaskToDeleteTitle: (state, action: PayloadAction<string>) => {
      state.taskToDeleteTitle = action.payload;
    },

    toggleFilterByPriority: (state) => {
      state.filterTaskByTopPriority = !state.filterTaskByTopPriority;
    },

    toggleFilterByOpenStatus: (state) => {
      state.filterTaskByOpenStatus = !state.filterTaskByOpenStatus;
    },

    updateCurrentTaskId: (state, action: PayloadAction<string>) => {
      state.currentTaskId = action.payload;
    },
  },
});

export const {
  updateAlltasks,
  addTaskToArray,
  deleteTaskFromArray,
  updateTaskToDeleteTitle,
  replaceTaskToNewTask,
  toggleFilterByPriority,
  toggleFilterByOpenStatus,
  updateCurrentTaskId,
} = tasksSlice.actions;

export default tasksSlice.reducer;
