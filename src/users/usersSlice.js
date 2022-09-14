import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from "../hooks/http.hook";

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState({
    usersLoadingStatus: 'idle',
    currentUser: null,
    isLoggedIn: false,
});

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async () => {
        const {request} = useHttp();
        return await request("http://localhost:3001/users");
    }
);

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser: (state, action) => {
            usersAdapter.addOne(state, action.payload)
        },
        removeUser: (state, action) => {
            usersAdapter.removeOne(state, action.payload)
        },
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
            state.isLoggedIn = true;
        },
        editUser: (state, action) => {
            usersAdapter.upsertOne(state, action.payload);
        },
        editCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, state => {state.usersLoadingStatus = 'loading';})
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.usersLoadingStatus = 'idle';
                usersAdapter.setAll(state, action.payload);
            })
            .addCase(fetchUsers.rejected, state => {
                state.usersLoadingStatus = 'error';
            })
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = usersSlice;

export const {selectAll} = usersAdapter.getSelectors(state => state.users);

export default reducer;

export const {
    addUser,
    removeUser,
    setCurrentUser,
    editUser,
    editCurrentUser
} = actions;