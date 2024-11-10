import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; 
import axios from 'axios';

export const register = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:3000/api/auth', userData);
    const registeredUserData = {
      user: response.data,
      headers: {
        'access-token': response.headers['access-token'],
        'client': response.headers['client'],
        'uid': response.headers['uid'],
      },
    };

    localStorage.setItem('authData', JSON.stringify(registeredUserData));
    return registeredUserData;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      return rejectWithValue(error.response.data.errors[0]);
    }
    return rejectWithValue('Failed to register');
  }
});

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:3000/api/auth/sign_in', credentials);
    const userData = {
      user: response.data,
      headers: {
        'access-token': response.headers['access-token'],
        'client': response.headers['client'],
        'uid': response.headers['uid'],
      },
    };
    
    localStorage.setItem('authData', JSON.stringify(userData));
    return userData;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      return rejectWithValue(error.response.data.errors[0]);
    }
    return rejectWithValue('Failed to login');
  }
});

export const signOut = createAsyncThunk('auth/signOut', async (headers, { rejectWithValue }) => {
  try {
    await axios.delete('http://localhost:3000/api/auth/sign_out', {
      headers: headers
    });
    
    localStorage.removeItem('authData');
    return true;
  } catch (error) {
    return rejectWithValue('Failed to sign out');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    headers: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.headers = null;
      state.error = null;
      
      localStorage.removeItem('authData');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.headers = action.payload.headers;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to register';
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.headers = action.payload.headers;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to login';
      })
      .addCase(signOut.fulfilled, (state) => {
        state.user = null;
        state.headers = null;
      })
      .addCase(signOut.rejected, (state, action) => {
        state.error = action.payload || 'Failed to sign out';
      });
  },
});

export const restoreLogin = () => (dispatch) => {
  const savedAuthData = localStorage.getItem('authData');
  if (savedAuthData) {
    const authData = JSON.parse(savedAuthData);
    dispatch(login.fulfilled(authData));
  }
};

export const { logout } = authSlice.actions;
export default authSlice.reducer;
