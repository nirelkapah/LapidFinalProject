import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState, AppDispatch } from '../store'

// Defines Global State
export interface WebState {
  openFormDialogBox: boolean,
  openAlertDialogBox: boolean
}

// Define the initial state using that type
const initialState: WebState = {
  openFormDialogBox: false ,
  openAlertDialogBox: false
}

export const webSlice = createSlice({
  name: 'web',
  initialState,
  reducers: {

    // Use the PayloadAction type to declare the contents of `action.payload`
    closeFormDialogBox: (state) => {
      state.openFormDialogBox = false;
    },

    openFormDialogBox: (state) => {
      state.openFormDialogBox = true;
    },

    closeAlertDialogBox: (state) => {
      state.openAlertDialogBox = false;
    },

    openAlertDialogBox: (state) => {
      state.openAlertDialogBox = true;
  },
}})

// export const alertDialogBoxSlice = createSlice({
//   name: 'openAlertDialogBox',
//   initialState,
//   reducers: {

//     // Use the PayloadAction type to declare the contents of `action.payload`
//     closeAlertDialogBox: (state) => {
//       state.openAlertDialogBox = false;
//     },

//     openAlertDialogBox: (state) => {
//       state.openAlertDialogBox = true;
//     },
//   },
// })

export const { closeFormDialogBox, openFormDialogBox, openAlertDialogBox, closeAlertDialogBox} = webSlice.actions
// export const { openAlertDialogBox, closeAlertDialogBox} = alertDialogBoxSlice.actions


export default webSlice.reducer
