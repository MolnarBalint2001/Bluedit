

import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AccountType} from "../../@types/account.type.ts";


type ManageAccountState = {
    accountData:AccountType | null
}

const initialState: ManageAccountState = {
    accountData:null
}

export const manageAccountSlice = createSlice({
    name: 'manageAccount',
    initialState,
    reducers: {
        setManageAccount(state, {payload}:PayloadAction<AccountType>){
            state.accountData = {...payload};
        },

        deletePost(state, {payload}:PayloadAction<string>){
            state.accountData!.posts = state.accountData!.posts.filter((x)=>{
                return x._id !== payload;
            })
        }
    }
})

export const { setManageAccount, deletePost} = manageAccountSlice.actions

export const manageAccountReducer = manageAccountSlice.reducer