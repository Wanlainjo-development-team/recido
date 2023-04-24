import { configureStore } from '@reduxjs/toolkit'
import useFormSlice from './features/useFormSlice'
import userSlice from './features/userSlice'

export const store = configureStore({
    reducer: {
        form: useFormSlice,
        user: userSlice
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
})