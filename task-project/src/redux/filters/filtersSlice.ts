import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {Filters, PriorityOptions, StatusOptions} from '../../model/filters'
import { Task } from "../../model/task";
export interface filtersState {
  filterBy: Filters;
  searchByKeyword: string;
}

const initialState: filtersState = {
  filterBy: {status: [], priority: []},
  searchByKeyword: '',
};

export const filtersSlice = createSlice({
  name: "filtersSlice",
  initialState,
  reducers: {

    updateSearchByKeyword: (state: filtersState, action: PayloadAction<string>) => {
      state.searchByKeyword = action.payload
    },

    updateStatusFilter: (state: filtersState, action: PayloadAction<StatusOptions>) => {
      state.filterBy.status.push(action.payload)
    },

    removeStatusFilter: (state: filtersState, action: PayloadAction<StatusOptions>) => {
      const array = state.filterBy.status;
      state.filterBy.status.splice(array.indexOf(action.payload), 1)  
    },

    updatePriorityFilter: (state: filtersState, action: PayloadAction<PriorityOptions>) => {
      state.filterBy.priority.push(action.payload)
    },

    removePriorityFilter: (state: filtersState, action: PayloadAction<PriorityOptions>) => {
      const array = state.filterBy.priority;
      state.filterBy.priority.splice(array.indexOf(action.payload), 1) 
    },
  },
});

export const {

  updateSearchByKeyword,
  updateStatusFilter,
  removeStatusFilter,
  updatePriorityFilter,
  removePriorityFilter

} = filtersSlice.actions;

export default filtersSlice.reducer;
