import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getAuthHeaders = () => {
  const authData = JSON.parse(localStorage.getItem('authData'));
  return authData ? authData.headers : {};
};

export const fetchClassrooms = createAsyncThunk('classrooms/fetchClassrooms', async (_, { rejectWithValue }) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.get('http://localhost:3000/api/classrooms', { headers });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const createClassroom = createAsyncThunk('classrooms/createClassroom', async (classroomData, { rejectWithValue }) => {
  try {
    const headers = getAuthHeaders();
    const classroom = {...classroomData.classroomData}
    console.log(classroom)
    const response = await axios.post('http://localhost:3000/api/classrooms', classroom, { headers });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const joinClassroom = createAsyncThunk('classrooms/joinClassroom', async ({ code, headers }, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:3000/api/classrooms/join', { code }, {
      headers: headers
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const classroomsSlice = createSlice({
  name: 'classrooms',
  initialState: {
    classrooms: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClassrooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClassrooms.fulfilled, (state, action) => {
        state.loading = false;
        state.classrooms = action.payload;
      })
      .addCase(fetchClassrooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch classrooms';
      })
      .addCase(createClassroom.fulfilled, (state, action) => {
        state.classrooms.push(action.payload);
      })
      .addCase(joinClassroom.fulfilled, (state, action) => {
        state.classrooms.push(action.payload);
      })
      .addCase(joinClassroom.rejected, (state, action) => {
        state.error = action.payload || 'Failed to join classroom';
      });
  },
});

export default classroomsSlice.reducer;
