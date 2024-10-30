import { configureStore } from "@reduxjs/toolkit";
import emailsReducers from '../Features/Emails/emailsSlice'
export const store = configureStore({
    reducer : {
        allEmail : emailsReducers
    },
})