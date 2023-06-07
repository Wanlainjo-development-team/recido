import { createSlice } from '@reduxjs/toolkit'

export const useInvoicesSlice = createSlice({
    name: 'invoices',
    initialState: {
        invoiceList: [],
        currentInvoiceId: null,
        search: ''
    },

    reducers: {
        setInvoiceList: (state, action) => {
            state.invoiceList = action.payload
        },

        setCurrentInvoiceId: (state, action) => {
            state.currentInvoiceId = action.payload
        },

        setSearch: (state, action) => {
            state.search = action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const {
    setInvoiceList,
    setCurrentInvoiceId,
    setSearch
} = useInvoicesSlice.actions

export default useInvoicesSlice.reducer