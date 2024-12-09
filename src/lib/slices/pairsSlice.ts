import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Pair {
  id: string;
  name: string;
  rate: number;
}

interface PairsState {
  items: Pair[];
}

const initialState: PairsState = {
  items: [],
};

const pairsSlice = createSlice({
  name: 'pairs',
  initialState,
  reducers: {
    setPairs(state, action: PayloadAction<Pair[]>) {
      state.items = action.payload;
    },
    addPair(state, action: PayloadAction<Pair>) {
      state.items.push(action.payload);
    },
    removePair(state, action: PayloadAction<string>) {
      state.items = state.items.filter(pair => pair.id !== action.payload);
    },
  },
});

export const { setPairs, addPair, removePair } = pairsSlice.actions;
export default pairsSlice.reducer;
