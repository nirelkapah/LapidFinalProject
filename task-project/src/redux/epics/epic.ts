import { Epic, StateObservable, ofType } from 'redux-observable';
import { combineEpics } from 'redux-observable';
import { Observable, concat, from, of } from 'rxjs';
import { switchMap, catchError, map, filter, mergeMap, startWith } from 'rxjs/operators';
import { GraphQLClient } from 'graphql-request';
import { QUERY_TASKS_LIST_BY_KEYWORD_AND_FILTERS, QUERY_TASK_BY_ID } from '../../graphql/queries';
import { updateSearchByKeyword, updateFilter} from '../filters/filtersSlice';
import type { RootState} from "../store";
import { setTasks, setTasksError, setTasksLoading } from '../tasks/tasksSlice';
import { Action} from 'redux';
import { PayloadAction } from '@reduxjs/toolkit';


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
      updateFilter.type),   
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

  // export const fetchTaskByIdEpic = (action$: any, state$: StateObservable<RootState>) =>
  // action$.pipe(
  //   ofType(
  //     addTask.type, 
  //    ),   
  //   mergeMap(() => {
  //     console.log(addTask)
  //     return from(graphqlClient.request(QUERY_TASK_BY_ID,
  //       { taskId: 'sda', fetchPolicy: 'no-cache' })).pipe(
  //         map((data: any) => setTasks(data)),
  //         catchError(() => of(setTasksError(true)))
  //       );
      
  //   })
  // );

const rootEpic = combineEpics(
    fetchTasksEpic,
    // fetchTaskByIdEpic
);

export default rootEpic;