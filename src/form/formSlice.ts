import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { inputType } from '../interfaces/interfaces'


export interface formState {
  inputs: inputType[]
}

const initialState: formState = {
  inputs: []
}


type isValidType = (value: string, type: string) => boolean

const isValidInput: isValidType = (value, type) => {
  return true
}


export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addWord: (state, action: PayloadAction<string>) => {
      // state.title += action.payload
    },
    checkInput: (state, action: PayloadAction<inputType>) => {
      state.inputs = {...state.inputs, ...action.payload}
    },
  }
});

export const { checkInput } = formSlice.actions

export const selectInputs = (state: RootState) => state.form.inputs;

export default formSlice.reducer;
