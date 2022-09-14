import { configureStore } from '@reduxjs/toolkit';
import posts from '../posts/postsSlice';
import users from '../users/usersSlice';

const store = configureStore({
    reducer: {
        posts,
        users
    },
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;