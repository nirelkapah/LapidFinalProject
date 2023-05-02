import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasks/tasksSlice";
import webReducer from "./web/webSlice";

export const store = configureStore({
  reducer: {
    tasksState: tasksReducer,
    webState: webReducer,
    // comments: commentsReducer,
    // users: usersReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
