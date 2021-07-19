import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { sendFormData } from '../app/formAPI'
import { RootState } from '../app/store'
import { iInputType } from '../interfaces/interfaces'

interface iFormState {
  inputs: iInputType
  loading: boolean
  formDisable: boolean
  logIn: {
    msg: string
    status: 'logged' | 'not logged'
  }
}
const initialState: iFormState = {
  inputs: {},
  loading: false,
  formDisable: false,
  logIn: {
    msg: '',
    status: 'not logged'
  }
}

export const logIn = createAsyncThunk(
  'form/sendFormData',
  async (emptyStoreInputs: iInputType, thunkAPI) => {
    const response = await sendFormData()
    thunkAPI.dispatch(hideLogStatus())
    return {
      data: response.data,
      emptyStoreInputs
    }
  }
)

export const hideLogStatus = createAsyncThunk(
  'form/hideLogStatus',
  async () => {
    await new Promise<string>((resolve) =>
      setTimeout(() => resolve(''), 2000)
    )
  }
)

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    changeInput(
      state,
      action: PayloadAction<iInputType>
    ) {
      state.inputs = {
        ...state.inputs,
        ...action.payload
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logIn.pending, state => {
        state.loading = true
        state.formDisable= true
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.loading = false
        state.formDisable = false
        state.inputs = {
          ...state.inputs,
          ...action.payload.emptyStoreInputs
        }
        state.logIn = {
          msg: action.payload.data,
          status: 'logged'
        }
      })
      .addCase(hideLogStatus.fulfilled, state => {
        state.logIn.status = 'not logged'
      })
  },
})

export const { changeInput } = formSlice.actions

export const selectInputs = (state: RootState) => state.form.inputs;
export const selectLoading = (state: RootState) => state.form.loading;
export const selectFormDisable = (state: RootState) => state.form.formDisable;
export const selectLogIn = (state: RootState) => state.form.logIn

export default formSlice.reducer