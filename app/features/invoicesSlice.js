import { createSlice } from '@reduxjs/toolkit'

export const useInvoicesSlice = createSlice({
    name: 'invoices',
    initialState: {
        invoiceList: [],
        invoiceId: null,
        search: ''
    },

    reducers: {
        setInvoiceList: (state, action) => {
            state.invoiceList = action.payload
        },

        setInvoiceId: (state, action) => {
            state.invoiceId = action.payload
        },

        setSearch: (state, action) => {
            state.search = action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const {
    setInvoiceList,
    setInvoiceId,
    setSearch
} = useInvoicesSlice.actions

export default useInvoicesSlice.reducer