import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact } from "./operations";

const initialState = {
    items: [],
    isLoading: false,
    error: null
};

const arrThunks = [fetchContacts, addContact, deleteContact];
const STATUS = {
    PENDING: 'pending',
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected'
}

const getActions = (type) => isAnyOf(...arrThunks.map(thunk => thunk[type]));

const handlePending = (state) => {
    state.isLoading = true;
};

const handleFulfilled = (state) => {
    state.isLoading = false;
    state.error = '';
};

const handleFulfilledFetchAll = (state, { payload }) => {
    state.items = payload;
};

const handleFulfilledAdd = (state, { payload }) => {
    state.items.push(payload);
};

const handleFulfilledDelete = (state, { payload }) => {
    state.items = state.items.filter(contact => contact.id !== payload.id);
};

const handleRejected = (state, { payload }) => {
    state.isLoading = false;
    state.error = payload;
};

const contactsSlice = createSlice({
    name: "contacts",
    initialState,
    extraReducers: (builder) => {
        const { PENDING, FULFILLED, REJECTED } = STATUS;

        builder
            .addCase(fetchContacts.fulfilled, handleFulfilledFetchAll)
            .addCase(addContact.fulfilled, handleFulfilledAdd)
            .addCase(deleteContact.fulfilled, handleFulfilledDelete)
            .addMatcher(
                getActions(PENDING),
                handlePending
            )
            .addMatcher(
                getActions(FULFILLED),
                handleFulfilled
            )
            .addMatcher(
                getActions(REJECTED),
                handleRejected
            )
    }
});

export const contactsReducer = contactsSlice.reducer;