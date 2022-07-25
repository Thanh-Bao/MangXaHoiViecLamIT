import { createSlice } from '@reduxjs/toolkit'

export const postsIndexSlice = createSlice({
  name: 'posts',
  initialState: {
    havedLogin: false,
    arrPost: []
  },
  reducers: {
    fetchPost: (state, { payload }) => {
      state.arrPost.push(...payload)
    },
    addPost: (state, { payload }) => {
      state.arrPost.unshift(payload)
    },
    updateLoginStatus: (state, { payload }) => {
      state.havedLogin = payload;
    },
    searchPost: (state, { payload }) => {
      state.arrPost = payload;
    }
  },
})

export const { fetchPost, addPost, updateLoginStatus, searchPost } = postsIndexSlice.actions

export default postsIndexSlice.reducer 