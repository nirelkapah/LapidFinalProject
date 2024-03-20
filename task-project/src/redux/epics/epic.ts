import { Epic, StateObservable, ofType } from 'redux-observable';
import { combineEpics } from 'redux-observable';
import { Observable, concat, from, of } from 'rxjs';
import { switchMap, catchError, map, filter, mergeMap, startWith } from 'rxjs/operators';
import { GraphQLClient } from 'graphql-request';
import { QUERY_TASKS_LIST_BY_KEYWORD_AND_FILTERS } from '../../graphql/queries';
import { updateSearchByKeyword, removePriorityFilter, updatePriorityFilter, updateStatusFilter, removeStatusFilter } from '../filters/filtersSlice';
import {triggerRefetch} from '../tasks/tasksSlice'
import type { RootState} from "../store";
import { useSelector } from 'react-redux';
import { selectFilters, selectSearchByKeyWord } from '../filters/filtersSelectors';
import { Filters, keywordAndFilters } from '../../model/filters';
import { setTasks, setTasksError, setTasksLoading } from '../tasks/tasksSlice';
import { Task } from '../../model/task';
import { Action, combineReducers } from 'redux';
import {TasksByKeywordAndFiltersQuery} from '../../gql/graphql'


const GRAPHQL_ENDPOINT = 'http://localhost:3001/graphql';

const graphqlClient = new GraphQLClient(GRAPHQL_ENDPOINT, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

// interface MyAction extends Action {
//   payload: any;
// }


export const fetchTasksEpic: any = (action$: Observable<Action>, state$: StateObservable<RootState>) =>
  action$.pipe(
    ofType(
      updateSearchByKeyword.type, 
      removePriorityFilter.type, 
      updatePriorityFilter.type, 
      updateStatusFilter.type, 
      removeStatusFilter.type, 
      triggerRefetch.type ),   
    mergeMap(() => {
      const loadingAction = setTasksLoading(true);
      return concat(
      of(loadingAction),
      from(graphqlClient.request(QUERY_TASKS_LIST_BY_KEYWORD_AND_FILTERS,
        { keyword: state$.value.filtersState.searchByKeyword , filters: state$.value.filtersState.filterBy , fetchPolicy: 'no-cache' })).pipe(
        map((data: any) => setTasks(data.tasksByKeywordAndFilters)), 
        catchError((error) => of(setTasksError(true))),
      ),
      of(setTasksLoading(false))
      )
    } 
    )
  );

const rootEpic = combineEpics(
    fetchTasksEpic
);

export default rootEpic;