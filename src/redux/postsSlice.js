import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async ({ classroomId, headers }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/classrooms/${classroomId}/posts`, {
        headers
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPostById = createAsyncThunk(
  'posts/fetchPostById',
  async ({ classroomId, postId, headers }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/classrooms/${classroomId}/posts/${postId}`, { headers });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const submitActivityResponse = createAsyncThunk(
  'posts/submitActivityResponse',
  async ({ postId, classroomId, payload, headers }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`http://localhost:3000/api/classrooms/${classroomId}/posts/${postId}/responses`, payload , {
        headers,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createPost = createAsyncThunk(
  'posts/createPost',
  async ({ classroomId, postData, headers }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`http://localhost:3000/api/classrooms/${classroomId}/posts`, postData, {
        headers
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchComments = createAsyncThunk(
  'posts/fetchComments',
  async ({ classroomId, postId, headers }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/classrooms/${classroomId}/posts/${postId}/comments`, {
        headers
      });
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

export const fetchActivityResponses = createAsyncThunk(
  'posts/fetchActivityResponses',
  async ({ classroomId, postId, headers }, { rejectWithValue }) => {
    
    try {
      const response = await axios.get(`http://localhost:3000/api/classrooms/${classroomId}/posts/${postId}/responses`, {
        headers,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Erro ao buscar respostas');
    }
  }
);


const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    post: null, 
    loading: false,
    responses: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch posts';
      })

      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch post';
      })

      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push({ ...action.payload, comments: [] });
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to create post';
      })

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
        state.error = action.payload || 'Failed to fetch comments';
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
        state.error = action.payload || 'Failed to create comment';
      })
      .addCase(fetchActivityResponses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActivityResponses.fulfilled, (state, action) => {
        state.loading = false;
        state.responses = action.payload;
      })
      .addCase(fetchActivityResponses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default postsSlice.reducer;
