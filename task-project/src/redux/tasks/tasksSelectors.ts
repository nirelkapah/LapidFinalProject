import type { RootState} from "../store";

export const selectFilterByTopPriority = (state: RootState) => state.tasksState.filterTaskByTopPriority;

export const selectFilterByOpenStatus = (state: RootState) => state.tasksState.filterTaskByOpenStatus;

export const selectSearchByKeyWord = (state:RootState) => state.tasksState.searchByKeyword;

export const selectFilters = (state:RootState) => state.tasksState.filterBy

