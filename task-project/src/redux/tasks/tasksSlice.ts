import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../../model/task";
import type { RootState, AppDispatch } from "../store";

// Defines Global State
export interface TasksState {
  tasksArray: Task[];
  taskToDeleteId: string;
  taskToDeleteTitle: string;
  taskToEditId: string;
  filterTaskByTopPriority: boolean;
  filterTaskByOpenStatus: boolean;
  currentTaskId: string;
}

// Define the initial state using that type
const initialState: TasksState = {
  tasksArray: [],
  taskToDeleteId: "",
  taskToDeleteTitle: "",
  taskToEditId: "",
  filterTaskByTopPriority: false,
  filterTaskByOpenStatus: false,
  currentTaskId: "",
};

export const tasksSlice = createSlice({
  name: "tasksArray",
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateAlltasks: (state, action: PayloadAction<Task[]>) => {
      state.tasksArray = action.payload;
    },

    // filterTasksByTop: (state, action: PayloadAction<boolean> ) => {
    //   if(action.payload){
    //     state.tasksArrayCache = state.tasksArray;
    //     state.tasksArray = state.tasksArray.filter(task => task.priority == "Top")
    //   }
    //   else{
    //     state.tasksArray = state.tasksArrayCache;
    //   }
    // },

    // filterTaskByOpen: (state, action: PayloadAction<boolean> ) => {
    //   if(action.payload){
    //     state.tasksArrayCache = state.tasksArray;
    //     state.tasksArray = state.tasksArray.filter(task => task.status == "Open")
    //   }
    //   else{
    //     state.tasksArray = state.tasksArrayCache;
    //   }
    // },

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
      // state.tasksArray.push(action.payload)
    },

    updateTaskToDeleteId: (state, action: PayloadAction<string>) => {
      state.taskToDeleteId = action.payload;
    },

    updateTaskToDeleteTitle: (state, action: PayloadAction<string>) => {
      state.taskToDeleteTitle = action.payload;
    },

    updateTaskToEditId: (state, action: PayloadAction<string>) => {
      state.taskToEditId = action.payload;
    },

    toggleFilterByPriority: (state) => {
      state.filterTaskByTopPriority = !state.filterTaskByTopPriority;
      console.log(state.filterTaskByTopPriority);
    },

    toggleFilterByOpenStatus: (state) => {
      state.filterTaskByOpenStatus = !state.filterTaskByOpenStatus;
      console.log(state.filterTaskByOpenStatus);
    },

    updateCurrentTaskId: (state, action: PayloadAction<string>) => {
      state.currentTaskId = action.payload;
    },
  },
});

export const {
  updateAlltasks,
  addTaskToArray,
  updateTaskToDeleteId,
  deleteTaskFromArray,
  updateTaskToDeleteTitle,
  updateTaskToEditId,
  replaceTaskToNewTask,
  toggleFilterByPriority,
  toggleFilterByOpenStatus,
  updateCurrentTaskId,
} = tasksSlice.actions;

export default tasksSlice.reducer;
