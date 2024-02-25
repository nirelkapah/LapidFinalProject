import type { RootState} from "../store";

export const selectSearchByKeyWord = (state:RootState) => state.tasksState.searchByKeyword;

export const selectFilters = (state:RootState) => state.tasksState.filterBy

