import { createSlice } from '@reduxjs/toolkit'

export const useCustomerSlice = createSlice({
    name: 'customer',
    initialState: {
        customersList: [],
    },

    reducers: {
        setCustomersList: (state, action) => {
            state.customersList = action.payload
        },
    }
})

// Action creators are generated for each case reducer function
export const {
    setCustomersList,
} = useCustomerSlice.actions

export default useCustomerSlice.reducer