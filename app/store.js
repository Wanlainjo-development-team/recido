import { configureStore } from '@reduxjs/toolkit'
import useFormSlice from './features/useFormSlice'
import userSlice from './features/userSlice'
import useInvoicesSlice from './features/invoicesSlice'

export const store = configureStore({
    reducer: {
        form: useFormSlice,
        user: userSlice,
        invoices: useInvoicesSlice,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
})