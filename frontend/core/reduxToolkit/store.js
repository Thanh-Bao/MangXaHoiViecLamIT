import { configureStore } from '@reduxjs/toolkit';
import postsIndexSlice from '@/reduxToolkit/slices/postsIndexSlice';

export const store = configureStore({
    reducer: {
        posts: postsIndexSlice,
    },
})