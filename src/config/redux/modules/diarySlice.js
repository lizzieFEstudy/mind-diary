// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

// const initialState = {
//   todos: [],
//   isLoading: false,
//   isError: false,
//   error: null
// };

// export const __getDiary = createAsyncThunk('getDiary', async (payload, thunkAPI) => {
//   try {
//     const response = await axios.get('http://localhost:4001/todos');
//     console.log('response', response);

//     return thunkAPI.fulfillWithValue(response.data);
//   } catch (error) {
//     console.log('error', error);

//     return thunkAPI.rejectWithValue(error);
//   }
// });

// export const diarySlice = createSlice({
//   name: 'todos',
//   initialState,
//   reducers: {},
//   extraReducers: {
//     [__getDiary.pending]: (state, action) => {
//       // 아직 진행중일 때
//       state.isLoading = true;
//       state.isError = false;
//     },
//     [__getDiary.fulfilled]: (state, action) => {
//       // 성공
//       // console.log('fulfilled : ', action);
//       state.isLoading = false;
//       state.isError = false;
//       state.todos = action.payload;
//     },
//     [__getDiary.rejected]: (state, action) => {
//       // 에러
//       state.isLoading = false;
//       state.isError = true;
//       state.error = action.payload;
//     }
//   }
// });

// export const {} = diarySlice.actions;
// export default diarySlice.reducer;
