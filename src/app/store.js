import {configureStore} from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';
import userReducer from '../features/users/userSlice'
const store=configureStore({
    reducer:{
    [apiSlice.reducerPath]:apiSlice.reducer,
     users:userReducer

    },
    middleware:getDefaultMiddleware=>getDefaultMiddleware().concat(apiSlice.middleware)

 })

 export default store