import { configureStore } from "@reduxjs/toolkit"
import authSlice from './features/auth/authSlice'


export const store = configureStore({
  reducer: {
    auth: authSlice
  }
})

// Infer the type of makeStore
// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store