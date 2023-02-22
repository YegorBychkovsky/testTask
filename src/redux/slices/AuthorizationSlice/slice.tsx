import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

type Params = {
  open: boolean;
  login: boolean;
  username: string;
  password: string;
  value: any;
};

const initialState: Params = {
  open: false,
  login: false,
  username: '',
  password: '',
  value: undefined,
};

export const AuthorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    changeOpenState(state, action: PayloadAction<boolean>) {
      state.open = action.payload;
    },
    changeLoginState(state, action: PayloadAction<boolean>) {
      state.login = action.payload;
    },
    addUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    addPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    addValue(state, action: PayloadAction<any>) {
      state.value = action.payload;
    },
  },
});

export const { changeOpenState, changeLoginState, addUsername, addPassword, addValue } =
  AuthorizationSlice.actions;

export const openSelect = (state: RootState) => state.authorization.open;
export const loginSelect = (state: RootState) => state.authorization.login;
export const usernameSelect = (state: RootState) => state.authorization.username;
export const passwordSelect = (state: RootState) => state.authorization.password;
export const valueSelect = (state: RootState) => state.authorization.value;

export default AuthorizationSlice.reducer;
