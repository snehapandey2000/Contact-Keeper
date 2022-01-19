import React, {Fragment,useContext} from 'react';
import ContactContext from "../../context/contact/contactContext";
import ContactItem from "./ContactItem";

function Contacts(){
    const contactContext=useContext(ContactContext);
    const {contacts}=contactContext;
    return(
        <Fragment>
            {contacts.map(contact=>(
                contact?
                <ContactItem key={contact.id} contact={contact}/>:
                console.log("error")
            ))}
        </Fragment>
    )
}

export default Contacts;

