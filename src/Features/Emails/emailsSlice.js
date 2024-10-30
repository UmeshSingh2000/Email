import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    emails: [],
    bodyCollapse: false
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
        },
        toggleBody(state,action) {
            state.bodyCollapse = action.payload;
        }
    }
})

export const { addEmails, addEmailsBody,toggleBody } = emailsSlice.actions

export default emailsSlice.reducer;