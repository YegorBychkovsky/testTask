import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface HeaderState {
  language: string;
}
const initialState: HeaderState = {
  language: 'en',
};

export const HeaderSlice = createSlice({
  name: 'Header',
  initialState,
  reducers: {
    changeLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
    },
  },
});
export const { changeLanguage } = HeaderSlice.actions;

export default HeaderSlice.reducer;

export const languageSelect = (state: RootState) => state.header.language;
