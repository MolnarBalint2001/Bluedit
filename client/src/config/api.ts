import axios from "axios";
import {VITE_API_BASE_URL} from "./globals.ts";


const getApiInstance = () =>{

    const instance = axios.create({
        baseURL:VITE_API_BASE_URL,
        headers:{
            'Content-Type' : 'application/json'
        },
        withCredentials:true
    });

    return instance;
}

export const getApi = () =>{
    return getApiInstance()
}