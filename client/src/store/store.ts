import { configureStore } from '@reduxjs/toolkit'
import {menuReducer} from "./menu/menu.slice.ts";
import {authReducer} from "./auth/auth.slice.ts";
import {manageAccountReducer} from "./manageAccount/manageAccount.slice.ts";



export const store = configureStore({
    reducer: {
        menu:menuReducer,
        auth:authReducer,
        manageAccount:manageAccountReducer
    }
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store