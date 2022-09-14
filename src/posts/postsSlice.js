import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from "../hooks/http.hook";

const postsAdapter = createEntityAdapter();

const initialState = postsAdapter.getInitialState({
    postsLoadingStatus: 'idle'
}); 

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async () => {
        const {request} = useHttp();
        return await request("http://localhost:3001/posts");
    }
);

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postCreated: (state, action) => {
            postsAdapter.addOne(state, action.payload)
        },
        postDeleted: (state, action) => {
            postsAdapter.removeOne(state, action.payload)
        },
        postChanged: (state, action) => {
            postsAdapter.upsertOne(state, action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, state => {state.postsLoadingStatus = 'loading';})
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.postsLoadingStatus = 'idle';
                postsAdapter.setAll(state, action.payload);
            })
            .addCase(fetchPosts.rejected, state => {
                state.postsLoadingStatus = 'error';
            })
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = postsSlice;

export default reducer;

export const {selectAll} = postsAdapter.getSelectors(state => state.posts);

export const {
    postsFetching,
    postsFetched,
    postsFetchingError,
    postCreated,
    postDeleted,
    postChanged
} = actions;