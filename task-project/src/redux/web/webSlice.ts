import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState, AppDispatch } from "../store";

// Defines Global State
export interface WebState {
  openFormDialogBox: boolean;
  openVerifyDialogBox: boolean;
  openReadDialogBox: boolean;
  errorAlertMessage: string;
  successAlertMessage: string;
}

// Define the initial state using that type
const initialState: WebState = {
  openFormDialogBox: false,
  openReadDialogBox: false,
  openVerifyDialogBox: false,
  errorAlertMessage: "",
  successAlertMessage: "",
};

export const webSlice = createSlice({
  name: "web",
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    closeFormDialogBox: (state: WebState) => {
      state.openFormDialogBox = false;
    },

    openFormDialogBox: (state: WebState) => {
      state.openFormDialogBox = true;
    },

    closeAlertDialogBox: (state: WebState) => {
      state.openVerifyDialogBox = false;
    },

    openAlertDialogBox: (state: WebState) => {
      state.openVerifyDialogBox = true;
    },

    closeReadDialogBox: (state: WebState) => {
      state.openReadDialogBox = false;
    },

    openReadDialogBox: (state: WebState) => {
      state.openReadDialogBox = true;
    },

    updateErrorAlertMessage: (state: WebState, action: PayloadAction<string>) => {
      state.errorAlertMessage = action.payload;
    },
    updateSuccessAlertMessage: (state: WebState, action: PayloadAction<string>) => {
      state.successAlertMessage = action.payload;
    },
  },
});

export const {
  closeFormDialogBox,
  openFormDialogBox,
  openAlertDialogBox,
  closeAlertDialogBox,
  openReadDialogBox,
  closeReadDialogBox,
  updateErrorAlertMessage,
  updateSuccessAlertMessage,
} = webSlice.actions;

export default webSlice.reducer;
