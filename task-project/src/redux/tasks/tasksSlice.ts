import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../../model/task";
import {Filters, PriorityOptions, StatusOptions} from '../../model/filters'
export interface TasksState {
  filterTaskByTopPriority: boolean;
  filterTaskByOpenStatus: boolean;
  filterBy: Filters;
  searchByKeyword: string;
}

const initialState: TasksState = {
  filterTaskByTopPriority: false,
  filterTaskByOpenStatus: false,
  filterBy: {status: [], priority: []},
  searchByKeyword: '',
};

export const tasksSlice = createSlice({
  name: "tasksArray",
  initialState,
  reducers: {

    toggleFilterByPriority: (state) => {
      state.filterTaskByTopPriority = !state.filterTaskByTopPriority;
    },

    toggleFilterByOpenStatus: (state) => {
      state.filterTaskByOpenStatus = !state.filterTaskByOpenStatus;
    },

    updateSearchByKeyword: (state, action: PayloadAction<string>) => {
      state.searchByKeyword = action.payload
    },

    updateStatusFilter: (state, action: PayloadAction<StatusOptions>) => {
      state.filterBy.status.push(action.payload)
    },

    removeStatusFilter: (state, action: PayloadAction<StatusOptions>) => {
      const array = state.filterBy.status;
      state.filterBy.status.splice(array.indexOf(action.payload), 1)  
    },

    updatePriorityFilter: (state, action: PayloadAction<PriorityOptions>) => {
      state.filterBy.priority.push(action.payload)
    },

    removePriorityFilter: (state, action: PayloadAction<PriorityOptions>) => {
      const array = state.filterBy.priority;
      state.filterBy.priority.splice(array.indexOf(action.payload), 1) 
    },
  },
});

export const {

  // deleteTaskFromArray,
  updateSearchByKeyword,
  toggleFilterByPriority,
  toggleFilterByOpenStatus,
  updateStatusFilter,
  removeStatusFilter,
  updatePriorityFilter,
  removePriorityFilter

} = tasksSlice.actions;

export default tasksSlice.reducer;
