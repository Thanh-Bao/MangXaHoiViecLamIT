import { configureStore } from '@reduxjs/toolkit';
import postsIndexSlice from '@/reduxToolkit/slices/postsIndexSlice';
import notificationsSlice from '@/reduxTookit/slices/notificationsSlice';

export const store = configureStore({
    reducer: {
        posts: postsIndexSlice,
        notifications: notificationsSlice,
    },
})