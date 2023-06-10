import { createSlice } from '@reduxjs/toolkit'

export const useInventorySlice = createSlice({
    name: 'inventory',
    initialState: {
        inventoryList: [],
    },

    reducers: {
        setInventoryList: (state, action) => {
            state.inventoryList = action.payload
        },
    }
})

// Action creators are generated for each case reducer function
export const {
    setInventoryList,
} = useInventorySlice.actions

export default useInventorySlice.reducer