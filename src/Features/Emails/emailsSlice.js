import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    emails: [],
    bodyCollapse: false,
}

export const emailsSlice = createSlice({
    name: 'allEmails',
    initialState,
    reducers: {
        addEmails(state, action) {
            state.emails = [];
            state.emails = [...state.emails, ...action.payload];
        },
        addEmailsBody(state, action) {
            const { id, body } = action.payload
            const index = state.emails.findIndex(email => email.id === id);
            state.emails[index].body = body;
            if(state.emails[index].read) return;
            state.emails[index].read = true;
        },
        toggleBody(state,action) {
            state.bodyCollapse = action.payload;
        },
        setFavorite(state,action){
            const { id } = action.payload;
            const email = state.emails.find(email => email.id === id);
            if (email) {
                email.favorite = true;
            }
        }
    }
})

export const { addEmails, addEmailsBody,toggleBody,setFavorite } = emailsSlice.actions

export default emailsSlice.reducer;