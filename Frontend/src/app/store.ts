import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import authReducer from '@/features/auth/AuthSlice';
import userReducer from '@/features/user/UserSlice';
import profileReducer from '@/features/profile/ProfileSlice';
import uploadReducer from '@/features/Upload/UploadSlice';

// Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  profile: profileReducer,
  upload: uploadReducer,
});

// Configuration for redux-persist
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store with the persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, 'upload/setFile'],
        ignoredPaths: ['upload.file'],
      },
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
