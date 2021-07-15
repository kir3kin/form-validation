import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'

export interface formState {
  title: string
}

const initialState: formState = {
  title: ''
}

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addWord: (state, action: PayloadAction<string>) => {
      state.title += action.payload
    },
  }
});

export const { addWord } = formSlice.actions

export const selectForm = (state: RootState) => state.form.title;

export default formSlice.reducer;
