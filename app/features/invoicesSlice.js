import { createSlice } from '@reduxjs/toolkit'

export const useInvoicesSlice = createSlice({
    name: 'invoices',
    initialState: {
        invoiceList: [],
    },

    reducers: {
        setInvoiceList: (state, action) => {
            state.invoiceList = action.payload
        },
    }
})

// Action creators are generated for each case reducer function
export const {
    setInvoiceList
} = useInvoicesSlice.actions

export default useInvoicesSlice.reducer