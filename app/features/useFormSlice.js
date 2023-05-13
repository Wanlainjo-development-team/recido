import { createSlice } from '@reduxjs/toolkit'

export const useFormSlice = createSlice({
    name: 'form',
    initialState: {
        // for setting invoice starts here
        order: `${(Math.floor(Math.random() * 900000) + 100000)}`,
        date: `${new Date('2023-09-22')}`,
        dueDate: `${new Date('2023-09-22')}`,
        removeDueDate: false,
        // for setting invoice ends here


        // for setting invoice contact starts here
        invoiceContact: null,
        // for setting invoice contact ends here

        customerName: '',
        customerEmail: '',
        contact: '',
        salesRep: '',
        paymentTerms: [],
        items: [],
        subTotal: 0,
        vat: 0,
        total: 0,
        useVAT: true,
        selectedTemplatePreview: null
    },
    reducers: {
        setOrder: (state, action) => {
            state.order = action.payload
        },
        setDate: (state, action) => {
            state.date = action.payload
        },
        setDueDate: (state, action) => {
            state.dueDate = action.payload
        },
        setRemoveDueDate: (state, action) => {
            state.removeDueDate = action.payload
        },
        setInvoiceContact: (state, action) => {
            state.invoiceContact = action.payload
        },
        setCustomerName: (state, action) => {
            state.customerName = action.payload
        },
        setCustomerEmail: (state, action) => {
            state.customerEmail = action.payload
        },
        setContact: (state, action) => {
            state.contact = action.payload
        },
        setSalesRep: (state, action) => {
            state.salesRep = action.payload
        },
        setPaymentTerms: (state, action) => {
            state.paymentTerms = [...state.paymentTerms, action.payload]
        },
        setItems: (state, action) => {
            state.items = [...state.items, action.payload]
        },
        setSubTotal: (state, action) => {
            state.subTotal = action.payload
        },
        setVat: (state, action) => {
            state.vat = action.payload
        },
        setTotal: (state, action) => {
            state.total = action.payload
        },
        setUseVAT: (state, action) => {
            state.useVAT = action.payload
        },
        deleteTerm: (state, action) => {
            state.paymentTerms.splice(action.payload, 1)
        },
        deleteItem: (state, action) => {
            state.items.splice(action.payload, 1)
        },
        setSelectedTemplatePreview: (state, action) => {
            state.selectedTemplatePreview = action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const {
    setOrder,
    setDate,
    setDueDate,
    setRemoveDueDate,
    setInvoiceContact,
    setCustomerEmail,
    setCustomerName,
    setContact,
    setSalesRep,
    setPaymentTerms,
    setItems,
    setSubTotal,
    setVat,
    setTotal,
    setUseVAT,
    deleteTerm,
    deleteItem,
    setSelectedTemplatePreview
} = useFormSlice.actions

export default useFormSlice.reducer