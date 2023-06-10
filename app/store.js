import { configureStore } from '@reduxjs/toolkit'
import useFormSlice from './features/useFormSlice'
import userSlice from './features/userSlice'
import useInvoicesSlice from './features/invoicesSlice'
import useCustomerSlice from './features/customerSlice'
import useInventorySlice from './features/inventorySlice'

export const store = configureStore({
    reducer: {
        form: useFormSlice,
        user: userSlice,
        invoices: useInvoicesSlice,
        customer: useCustomerSlice,
        inventory: useInventorySlice,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
})