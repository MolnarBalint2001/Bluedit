

import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserType} from "../../@types/user.type.ts";



type AuthState = {
    user:UserType | null
}

const initialState: AuthState = {
    user:JSON.parse(localStorage.getItem("user") || "{}") as UserType || null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state,{payload}:PayloadAction<UserType>){
            localStorage.setItem("user", JSON.stringify(payload));
        }
    }
})

export const { setUser} = authSlice.actions

export const authReducer = authSlice.reducer

