import React, {Fragment,useContext} from 'react';
import ContactContext from "../../context/contact/contactContext";
import ContactItem from "./ContactItem";

function Contacts(){
    const contactContext=useContext(ContactContext);
    const {contacts}=contactContext;
    return(
        <Fragment>
                //console.log("Map",contacts[contacts.length-1].id)
            {contacts.map(contact=>(
                contact?
                <ContactItem key={contact.id} contact={contact}/>:
                console.log("error")
            ))}
        </Fragment>
    )
}

export default Contacts;

