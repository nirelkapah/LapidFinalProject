import type { RootState, AppDispatch } from "../store";

// Other code such as selectors can use the imported `RootState` type
export const selectOpenFormDialogBox = (state: RootState) => {
  return state.webState.openFormDialogBox;
};

export const selectOpenAlertDialogBox = (state: RootState) => {
  return state.webState.openVerifyDialogBox;
};

export const selectOpenReadDialogBox = (state: RootState) => {
  return state.webState.openReadDialogBox;
};

export const selectErrorAlertMessage = (state: RootState) => {
  return state.webState.errorAlertMessage;
};

export const selectSuccessAlertMessage = (state: RootState) => {
  return state.webState.successAlertMessage;
};
