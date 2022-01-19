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
        ],
        current:null  
    };
    const [state,dispatch]=useReducer(contactReducer,initialState);
    //Add Contact
    function addContact(contact) {
        contact.id=uuidv4();
        //console.log("Hello", contact.id, contact);
        dispatch({type: ADD_CONTACT,payload: contact});
    }
    //Delete Contact
    function deleteContact(id) {
        dispatch({type: DELETE_CONTACT,payload:id});
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
    function updateContact(contact) {
        dispatch({type: UPDATE_CURRENT,payload:contact});
    }

    //Filter Contacts
    //Clear Filter

    return(
        <contactContext.Provider value={{
            contacts: state.contacts,
            current: state.current,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent
        }}>
            {props.children}
        </contactContext.Provider>
    );
};

export default ContactState;

