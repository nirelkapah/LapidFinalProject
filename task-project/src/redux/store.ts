import { configureStore } from "@reduxjs/toolkit";
import { createEpicMiddleware } from 'redux-observable';
import filtersReducer from "./filters/filtersSlice";
import webReducer from "./web/webSlice";
import tasksReducer from './tasks/tasksSlice'
import rootEpic from './epics/epic'; // your root epic file


const epicMiddleware = createEpicMiddleware();
// const middleware = [
//   ...getDefaultMiddleware({
//     serializableCheck: false // this is optional, if you want to disable serializableCheck
//   }),
//   epicMiddleware
// ];

export const store = configureStore({
  reducer: {
    filtersState: filtersReducer,
    webState: webReducer,
    tasksState: tasksReducer
  },
  middleware: [epicMiddleware]
});

epicMiddleware.run(rootEpic);


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
