import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import siteReducer from './siteSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    site: siteReducer,
  },
});

export default store;
