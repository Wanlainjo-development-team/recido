import { createSlice } from '@reduxjs/toolkit'

export const useFormSlice = createSlice({
    name: 'form',
    initialState: {
        // for setting invoice starts here
        invoiceId: 0,
        date: `${new Date()}`,
        // for setting invoice ends here


        // for setting invoice contact starts here
        invoiceContact: null,
        // address
        city: '',
        state: '',
        zip: '',
        country: '',
        // shipping address
        shippingCity: '',
        shippingState: '',
        shippingZip: '',
        shippingCountry: '',
        // for setting invoice contact ends here

        // for setting invoice items starts here
        items: [],
        // for setting invoice items ends here

        // for setting invoice note starts here
        note: '',
        // for setting invoice note ends here

        subTotal: 0,
        vat: 0,
        total: 0,
        useVAT: true,
        selectedTemplatePreview: null,
        archiveList: [],
        inventoryArchiveList: [],
        contactArchiveList: [],
    },
    reducers: {
        setInvoiceId: (state, action) => {
            let formattedInteger = String(action.payload).padStart(6, '0');
            state.invoiceId = formattedInteger
        },

        setDate: (state, action) => {
            state.date = action.payload
        },

        setInvoiceContact: (state, action) => {
            state.invoiceContact = action.payload
        },

        setCity: (state, action) => {
            state.city = action.payload
        },

        setState: (state, action) => {
            state.state = action.payload
        },

        setZip: (state, action) => {
            state.zip = action.payload
        },

        setCountry: (state, action) => {
            state.country = action.payload
        },

        setShippingCity: (state, action) => {
            state.city = action.payload
        },

        setShippingState: (state, action) => {
            state.state = action.payload
        },

        setShippingZip: (state, action) => {
            state.zip = action.payload
        },

        setShippingCountry: (state, action) => {
            state.shippingCountry = action.payload
        },

        setItems: (state, action) => {
            state.items = [...state.items, action.payload]
        },

        deleteItems: (state, action) => {
            let newArray = [...state.items]

            newArray.splice(action.payload, 1)

            state.items = newArray
        },

        editItems: (state, action) => {
            if (action.payload.index != -1)
                state.items[action.payload.index] = action.payload.item
        },

        updateItems: (state, action) => {
            state.items = action.payload
        },

        setNote: (state, action) => {
            state.note = action.payload
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

        deleteItem: (state, action) => {
            state.items.splice(action.payload, 1)
        },

        setSelectedTemplatePreview: (state, action) => {
            state.selectedTemplatePreview = action.payload
        },

        setArchiveList: (state, action) => {
            state.archiveList = action.payload
        },

        setInventoryArchiveList: (state, action) => {
            state.inventoryArchiveList = action.payload
        },

        setContactArchiveList: (state, action) => {
            state.contactArchiveList = action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const {
    setInvoiceId,
    setDate,
    setInvoiceContact,
    setCity,
    setState,
    setZip,
    setCountry,
    setShippingCity,
    setShippingState,
    setShippingZip,
    setShippingCountry,
    setItems,
    deleteItems,
    editItems,
    updateItems,
    setNote,
    setSubTotal,
    setVat,
    setTotal,
    setUseVAT,
    deleteItem,
    setSelectedTemplatePreview,
    setArchiveList,
    setInventoryArchiveList,
    setContactArchiveList
} = useFormSlice.actions

export default useFormSlice.reducer