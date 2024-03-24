import { Epic, StateObservable, ofType } from 'redux-observable';
import { combineEpics } from 'redux-observable';
import { Observable, concat, from, of } from 'rxjs';
import { switchMap, catchError, map, filter, mergeMap, startWith } from 'rxjs/operators';
import { GraphQLClient } from 'graphql-request';
import { QUERY_TASKS_LIST_BY_KEYWORD_AND_FILTERS } from '../../graphql/queries';
import { updateSearchByKeyword, updateFilter} from '../filters/filtersSlice';
import {triggerRefetch} from '../tasks/tasksSlice'
import type { RootState} from "../store";
import { setTasks, setTasksError, setTasksLoading } from '../tasks/tasksSlice';
import { Action} from 'redux';


const GRAPHQL_ENDPOINT = 'http://localhost:3001/graphql';

const graphqlClient = new GraphQLClient(GRAPHQL_ENDPOINT, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const fetchTasksEpic = (action$: Observable<Action>, state$: StateObservable<RootState>) =>
  action$.pipe(
    ofType(
      updateSearchByKeyword.type, 
      updateFilter.type, 
      triggerRefetch.type ),   
    mergeMap(() => {
      const loadingAction = setTasksLoading(true);
      return concat( //combine observables 
      of(loadingAction),
      from(graphqlClient.request(QUERY_TASKS_LIST_BY_KEYWORD_AND_FILTERS,
        { keyword: state$.value.filtersState.searchByKeyword , filters: state$.value.filtersState.filterBy , fetchPolicy: 'no-cache' })).pipe(
        map((data: any) => setTasks(data.tasksByKeywordAndFilters)), 
        catchError(() => of(setTasksError(true))),
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