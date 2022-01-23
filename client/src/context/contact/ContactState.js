import React,{useReducer} from "react";
import axios from "axios";
//import {v4 as uuidv4} from "uuid";
import contactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR,
    GET_CONTACTS,
    CLEAR_CONTACTS
} from "../types";

const ContactState=props=>{
    const initialState={
        contacts:null,
        current:null ,
        filtered:null,
        error:null
    };
    const [state,dispatch]=useReducer(contactReducer,initialState);
    //Get Contacts
    async function getContacts() {
        try{
            const res=await axios.get("http://localhost:5000/api/contacts");
            dispatch({type: GET_CONTACTS,payload: res.data});
        }catch(err){
            dispatch({type:CONTACT_ERROR, payload: err.response.msg});
        }
    }
    //Add Contact
    async function addContact(contact) {
        //contact.id=uuidv4();
        const config={
            headers:{
                "Content-Type": "application/json"
            }
        };
        try{
            const res=await axios.post("http://localhost:5000/api/contacts", contact,config);
            dispatch({type: ADD_CONTACT,payload: res.data});
        }catch(err){
            dispatch({type:CONTACT_ERROR, payload: err.response.msg});
        }
    }
    //Delete Contact
    async function deleteContact(id) {
        try{
            console.log("hello");
            await axios.delete(`http://localhost:5000/api/contacts/${id}`);
            dispatch({type: DELETE_CONTACT,payload:id});
        }catch(err){
            dispatch({type:CONTACT_ERROR, payload: err.response.msg});
        }
        
    }
    //Clear Contacts
    function clearContacts() {
        dispatch({type:CLEAR_CONTACTS});
    }
    //Set Current Contact
    function setCurrent(contact) {
        dispatch({type: SET_CURRENT,payload:contact});
    }
    //Clear Current Contact
    function clearCurrent() {
        dispatch({type: CLEAR_CURRENT});
    }
    //Update Contact
    async function updateContact(contact) {
        const config={
            headers:{
                "Content-Type": "application/json"
            }
        };
        try{
            const res=await axios.put(`http://localhost:5000/api/contacts/${contact._id}`, contact,config);
            dispatch({type: UPDATE_CONTACT,payload:res.data});
        }catch(err){
            dispatch({type:CONTACT_ERROR, payload: err.response.msg});
        }
    }

    //Filter Contacts
    function filterContacts(text) {
        dispatch({type: FILTER_CONTACTS,payload:text});
    }
    //Clear Filter
    function clearFilter() {
        dispatch({type: CLEAR_FILTER});
    }

    return(
        <contactContext.Provider value={{
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            error:state.error,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContacts,
            clearFilter,
            getContacts,
            clearContacts
        }}>
            {props.children}
        </contactContext.Provider>
    );
};

export default ContactState;

