import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import feedReducer from './feedSlice';
import connctionReducer from './connectionSlice';
import requestReducer from './requestSLice';

const appStore = configureStore({
  reducer: {
    user:userReducer,
    feed: feedReducer,
    connections: connctionReducer,
    requests: requestReducer
    },
})

export default appStore;