import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: 'feed',
    initialState: null,
    reducers: {
        addFeed: (state, action) => {
            return action.payload; // Replace the current state with the new feed
        },
        removeFeed: () => {
            return null; // Clear the feed
        },
        removeUserFromFeed: (state, action) => {
            // Ensure state is an array before filtering
            return state ? state.filter((user) => user._id !== action.payload) : state;
        },
    }
});

export const { addFeed, removeFeed, removeUserFromFeed } = feedSlice.actions;

export default feedSlice.reducer;
