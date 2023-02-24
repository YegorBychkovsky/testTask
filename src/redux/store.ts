import { configureStore } from '@reduxjs/toolkit';

import main from './slices/MainPageSlice/slice';
import latestNews from './slices/NewsPageSlice/slice';
import authorization from './slices/AuthorizationSlice/slice';
import header from './slices/HeaderSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    main,
    latestNews,
    authorization,
    header,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
