import React,{useReducer} from "react";
import {v4 as uuidv4} from "uuid";
import contactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from "../types";

const ContactState=props=>{
    const initialState={
        contacts:[
        {
            id:1,
            name:"A",
            email:"A@gamil.com",
            phone:"123456789",
            type:"personal"
        },
        {
            id:2,
            name:"B",
            email:"B@gamil.com",
            phone:"123456789",
            type:"professional"
        }
        ]   
    };
    const [state,dispatch]=useReducer(contactReducer,initialState);
    //Add Contact
    function addContact(contact) {
        contact.id=uuidv4();
        console.log("Hello", contact.id, contact);
        dispatch({type: ADD_CONTACT,payload: contact});
    }
    //Delete Contact
    //Set Current Contact
    //Clear Current Contact
    //Update Contact
    //Filter Contacts
    //Clear Filter

    return(
        <contactContext.Provider value={{
            contacts: state.contacts,
            addContact
        }}>
            {props.children}
        </contactContext.Provider>
    );
};

export default ContactState;

