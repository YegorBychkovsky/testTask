import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Params = {
  totalPrice: number;
  items: [];
};

const initialState: Params = {
  totalPrice: 12,
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<number>) {
      state.totalPrice = action.payload;
    },
  },
});

export const { addItem } = cartSlice.actions;

export default cartSlice.reducer;
