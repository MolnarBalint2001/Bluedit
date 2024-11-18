import {createSlice} from "@reduxjs/toolkit";


type MenuState = {
    opened:boolean
}

const initialState: MenuState = {
    opened:true
}

export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        toggleMenu(state){
            state.opened = !state.opened;
        }
    }
})

export const { toggleMenu} = menuSlice.actions

export const menuReducer = menuSlice.reducer