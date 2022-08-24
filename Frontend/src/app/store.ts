import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import commonReducer from '../features/common/commonSlice';
import counterReducer from '../features/counter/counterSlice';
import searchReducer from '../features/search/searchSlice';

export const store = configureStore({
  reducer: {
    common: commonReducer,
    search: searchReducer,
    counter: counterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
