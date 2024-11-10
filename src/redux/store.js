import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import classroomsReducer from './classroomsSlice'
import postsReducer from './postsSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    classrooms: classroomsReducer,
    posts: postsReducer,
  },
});

export default store;