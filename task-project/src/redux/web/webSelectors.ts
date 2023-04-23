
import type { RootState, AppDispatch } from '../store'

// Other code such as selectors can use the imported `RootState` type
export const selectOpenFormDialogBox = (state: RootState) => {
    return state.webState.openFormDialogBox};

export const selectOpenAlertDialogBox = (state: RootState) => {
    return state.webState.openAlertDialogBox};
