import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchCount } from './commonAPI';

export const DefaultErrorMessage = 'Oops... Something went wrong. Please reload the page'

export interface CommonState {
  loading: number;
  notification: {
    message: string;
    reason: 'info' | 'error'
  } | null;
}

const initialState: CommonState = {
  loading: 0,
  notification: null,
};

export const loadConfigAsync = createAsyncThunk(
  'common/loadConfig',
  async () => {
    const response = await fetchCount();
    return response.data;
  }
);

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    startLoadingIndicator: (state) => {
      state.loading += 1;
    },
    stopLoadingIndicator: (state) => {
      state.loading -= 1;
    },
    handleError: (state, action: PayloadAction<{ error: any, showErrorMessage?: boolean }>) => {
      state.loading -= 1;

      const error = action.payload.error;
      let errorMessage: string;
      if (error.constructor === Response) {
        errorMessage = `Response ${error.status} ${error.statusText} at ${error.url}`
      } else {
        errorMessage = error;
      }
      state.notification = {
        message: action.payload.showErrorMessage ? errorMessage : DefaultErrorMessage,
        reason: 'error'
      }
    },
    showInfo: (state, action: PayloadAction<{ message: string }>) => {
      state.notification = {
        message: action.payload.message,
        reason: 'info'
      }
    },
    closeNotification: (state) => {
      state.notification = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadConfigAsync.pending, (state) => {
        state.loading += 1;
      })
      .addCase(loadConfigAsync.fulfilled, (state, action) => {
        // state.value += action.payload;
        state.loading -= 1;
      })
      .addCase(loadConfigAsync.rejected, (state) => {
        state.loading -= 1;
      });
  },
});

export const { startLoadingIndicator, stopLoadingIndicator, handleError, showInfo, closeNotification } = commonSlice.actions;

export const selectIsLoading = (state: RootState) => state.common.loading > 0;

export default commonSlice.reducer;
