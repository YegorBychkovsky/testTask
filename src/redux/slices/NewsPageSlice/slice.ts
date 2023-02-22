import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import newsAxios from '../../../api/newsAxios';
import { RootState } from '../../store';
import { LatestNewsState, Status, FetchLatestNews, SearchLatestNews } from './types';

const initialState: LatestNewsState = {
  fetchResponse: undefined,
  news: [],
  number: [{}, {}, {}, {}],
  status: Status.LOADING,
};

export const fetchingLatestNews = createAsyncThunk<FetchLatestNews, SearchLatestNews>(
  'news/fetchLatestNews',
  async (params) => {
    const { url } = params;
    const { data } = await newsAxios.get<FetchLatestNews>(url);

    return data;
  },
);

export const latestNewsSlice = createSlice({
  name: 'latestNews',
  initialState,
  reducers: {
    deleteItem(state, action: PayloadAction<number>) {
      state.news?.splice(action.payload, 1);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchingLatestNews.pending, (state) => {
      state.status = Status.LOADING;
      state.fetchResponse = undefined;
    });
    builder.addCase(fetchingLatestNews.fulfilled, (state, action) => {
      state.fetchResponse = action.payload;

      state.news = action.payload.results;

      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchingLatestNews.rejected, (state) => {
      state.status = Status.ERROR;
      state.fetchResponse = undefined;
    });
  },
});
export const { deleteItem } = latestNewsSlice.actions;

export default latestNewsSlice.reducer;

export const latestNewsResultsSelect = (state: RootState) => state.latestNews.news;
export const latestNewsSelect = (state: RootState) => state.latestNews.fetchResponse;
export const numberSelect = (state: RootState) => state.latestNews.number;
