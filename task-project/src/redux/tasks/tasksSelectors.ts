import type { RootState} from "../store";

export const selectTasks = (state: RootState) => {
  return state.tasksState;
};

export const selectTaskToDeleteTitle = (state: RootState) => {
  return state.tasksState.taskToDeleteTitle;
};

export const selectCurrentTaskId = (state: RootState) => {
  return state.tasksState.currentTaskId;
};

export const selectTaskToEdit = (state: RootState) => {
  return state.tasksState.tasksArray.find(
    (task) => task._id === state.tasksState.currentTaskId
  );
};

export const selectCurrentTask = (state: RootState) => {
  return state.tasksState.tasksArray.find(
    (task) => task._id === state.tasksState.currentTaskId
  );
};

export const TaskIsEdited = (state: RootState) => {
  if (state.tasksState.currentTaskId != "") {
    return true;
  }
  return false;
};

export const selectFilterByTopPriority = (state: RootState) => {
  return state.tasksState.filterTaskByTopPriority;
};

export const selectFilterByOpenStatus = (state: RootState) => {
  return state.tasksState.filterTaskByOpenStatus;
};
