'use client';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import UserServices from '@/app/api/User/route';

// initial value
const initialState = {
  user: {},
  status: 'idle',
  error: null,
};

// for fetching the data
export const getUserData = createAsyncThunk('session/getUserData', async () => {
  const token = sessionStorage.getItem('jwtToken');
  // check if token exist
  if (token) {
    const response = await UserServices().getUserData(token);
    console.log('response at sessionSlice.js : ', response);
    // setSession(response);
    return response;
  }
  return {
    error: 'Token not exist',
  };
});

export const sessionSlice = createSlice({
  // name of the slice
  name: 'session',
  // for set initialState in sessionSlice
  initialState: {
    value: initialState,
  },
  //
  reducers: {
    // method for set the session
    setSession: (state, action) => {
      state.value = action.payload;
    },
  },
  // function for listening the promise status
  extraReducers(builder) {
    builder
      //for handle when status pending
      .addCase(getUserData.pending, (state) => {
        state.status = 'loading';
        return;
      })
      //for handle when status fulfilled
      .addCase(getUserData.fulfilled, (state, action) => {
        // check if there is an Error from server
        if (!action.payload.error) {
          state.status = 'succeeded';
          state.user = action.payload;
          return;
        }
        console.log(action.payload);
        state.status = 'failed';
        state.error = action.error;
        return;
      })
      //for handle when status rejected
      .addCase(getUserData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        return;
      });
  },
});

export const { setSession } = sessionSlice.actions;
export default sessionSlice.reducer;
