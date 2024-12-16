

import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserType} from "../../@types/user.type.ts";



type AuthState = {
    user:UserType | null,
    updateTrigger:boolean
}

function getUserFromLocalStorage(): UserType | null {
    try {
        const user = localStorage.getItem('user');
        return user ? (JSON.parse(user) as UserType) : null;
    } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
        return null;
    }
}


const initialState: AuthState = {
    user:getUserFromLocalStorage()

}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state,{payload}:PayloadAction<UserType>){
            localStorage.setItem("user", JSON.stringify(payload));
            state.user = {...payload}
        },

    }
})

export const { setUser} = authSlice.actions

export const authReducer = authSlice.reducer

