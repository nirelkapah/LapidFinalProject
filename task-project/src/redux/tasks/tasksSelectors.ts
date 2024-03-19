import type { RootState} from "../store";

export const selectTasks = (state:RootState) => state.tasksState.tasks

export const selectTasksError = (state:RootState) => state.tasksState.error

export const selectTasksLoading = (state:RootState) => state.tasksState.loading



