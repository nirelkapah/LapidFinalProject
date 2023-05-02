
import type { RootState, AppDispatch } from '../store'

// Other code such as selectors can use the imported `RootState` type
export const selectTasks = (state: RootState) => {
    return state.tasksState};

export const selectTaskToDeleteId = (state: RootState) => {
    return state.tasksState.taskToDeleteId};

export const selectTaskToDeleteTitle = (state: RootState) => {
    return state.tasksState.taskToDeleteTitle};
    
export const selectTaskToEditId = (state: RootState) => {
    return state.tasksState.taskToEditId};

export const selectCurrentTaskId = (state: RootState) => {
    return state.tasksState.currentTaskId};

export const selectTaskToEdit = (state: RootState) => {
        return state.tasksState.tasksArray.find(task => task._id == state.tasksState.taskToEditId)   
};

export const selectCurrentTask = (state: RootState) => {
    return state.tasksState.tasksArray.find(task => task._id == state.tasksState.currentTaskId)   
};

export const TaskIsEdited = (state: RootState) => {
    if(state.tasksState.taskToEditId != ""){
        return true
    }  
    return false 
};

export const selectFilterByTopPriority = (state: RootState) => {
    return state.tasksState.filterTaskByTopPriority};

export const selectFilterByOpenStatus = (state: RootState) => {
    return state.tasksState.filterTaskByOpenStatus};