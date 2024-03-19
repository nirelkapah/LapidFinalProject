import type { RootState} from "../store";

export const selectSearchByKeyWord = (state:RootState) => state.filtersState.searchByKeyword;

export const selectFilters = (state:RootState) => state.filtersState.filterBy



