import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchComments = createAsyncThunk(
  'posts/fetchComments',
  async ({ classroomId, postId, headers }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/classrooms/${classroomId}/posts/${postId}/comments`,
        { headers }
      );
      return { postId, comments: response.data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createComment = createAsyncThunk(
  'posts/createComment',
  async ({ classroomId, postId, commentData, headers }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/classrooms/${classroomId}/posts/${postId}/comments`,
        commentData,
        { headers }
      );
      return { postId, comment: response.data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        const { postId, comments } = action.payload;
        const post = state.posts.find((post) => post.id === postId);
        if (post) {
          post.comments = comments; 
        }
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false;
        const { postId, comment } = action.payload;
        const post = state.posts.find((post) => post.id === postId);
        if (post && post.comments) {
          post.comments.push(comment); 
        }
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default postsSlice.reducer;
