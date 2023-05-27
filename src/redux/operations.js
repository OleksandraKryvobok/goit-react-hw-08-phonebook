import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = 'https://645ea29112e0a87ac0f4c028.mockapi.io/api/v1';

export const fetchContacts = createAsyncThunk('contacts/fetchAll', async () => {
    const response = await axios.get('/contacts');
    return response.data;
});

export const addContact = createAsyncThunk('contacts/addContact', async (newContact) => {
    const response = await axios.post('/contacts', {
        name: newContact.name,
        phone: newContact.phone
    });
    return response.data;
});

export const deleteContact = createAsyncThunk('contacts/deleteContact', async (id) => {
    const response = await axios.delete(`/contacts/${id}`);
    return response.data;
});