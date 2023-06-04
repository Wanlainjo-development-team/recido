import { createSlice } from '@reduxjs/toolkit'

export const useInvoicesSlice = createSlice({
    name: 'invoices',
    initialState: {
        invoiceList: [],
        invoiceId: null
    },

    reducers: {
        setInvoiceList: (state, action) => {
            state.invoiceList = action.payload
        },

        setInvoiceId: (state, action) => {
            state.invoiceId = action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const {
    setInvoiceList,
    setInvoiceId
} = useInvoicesSlice.actions

export default useInvoicesSlice.reducer