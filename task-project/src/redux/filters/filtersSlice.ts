import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {Filters} from '../../model/filters'
import { Task } from "../../model/task";
export interface filtersState {
  filterBy: Filters;
  searchByKeyword: string;
}

const initialState: filtersState = {
  filterBy: [],
  searchByKeyword: '',
};

export const filtersSlice = createSlice({
  name: "filtersSlice",
  initialState,
  reducers: {

    updateSearchByKeyword: (state: filtersState, action: PayloadAction<string>) => {
      state.searchByKeyword = action.payload
    },

    updateFilter: (state: filtersState, action: PayloadAction<string>) => {
      state.filterBy.includes(action.payload) ? state.filterBy.splice(state.filterBy.indexOf(action.payload), 1) :
      state.filterBy.push(action.payload)
    },

  },
});

export const {

  updateSearchByKeyword,
  updateFilter

} = filtersSlice.actions;

export default filtersSlice.reducer;
