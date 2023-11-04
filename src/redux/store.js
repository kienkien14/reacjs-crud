import { configureStore } from '@reduxjs/toolkit'
// import couterReducer from './counterSlice'
import cReducer from './categorySlice'
import uReducer from './userSlice'
import pReducer from './productSlice'
import bReducer from './billSlice'

export const store = configureStore({
    reducer: {
        // counter: couterReducer,
        category: cReducer, // {categories: [], recordsFiltered: 0)
        user: uReducer,
        product: pReducer,
        bill: bReducer
    }
})      