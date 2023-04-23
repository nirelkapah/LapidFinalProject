
import type { RootState, AppDispatch } from '../store'

// Other code such as selectors can use the imported `RootState` type
export const selectTasks = (state: RootState) => {
    return state.tasksState};
