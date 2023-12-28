import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes,useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import "./App.css";
import Header from "./Header";
import AddContacts from "./AddContacts";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";
import EditContact from "./EditContact";
import Client from "../api/ApolloClientt";
import { GetConactsList } from "../api/ContactsApi";
import { ADD_CONTACT, UPDATE_CONTACT } from "../api/ContactsApi";
import { useMutation } from '@apollo/client';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const allContactsData = GetConactsList();
  const[addContact, {data}] = useMutation(ADD_CONTACT);
  const[updateContact] = useMutation(UPDATE_CONTACT);


  useEffect(() => {
    const getAllCOntacts = async () => {
      if (allContactsData) setContacts(allContactsData.contacts);
    };
    getAllCOntacts();
  }, [GetConactsList()]);
  

  const addContactHandler = async (contact) => {
    try {
      const { data } = await addContact({
        variables: {
          name: contact.name,
          email: contact.email
        }
      });
      setContacts([...contacts, data.addContact]);
    } catch (error) {
      console.error("Error adding contact:", error.message);
    }  
  };

  const updateContactHandler = async (contact) => {
    try {
      console.log(contact);
      const { data } = await updateContact({
        variables: {
          id: contact.id,
          name: contact.name,
          email: contact.email
        }
      });
      setContacts([...contacts, data.addContact]);
    } catch (error) {
      console.error("Error adding contact:", error.message);
    }
  };

  const removeContactHandler = async (id) => {
    await Client.delete(`/ContactsApi/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if(searchTerm !== ""){
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact).join("").toLowerCase().includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    } else {
      setSearchResults(contacts);
    }   
  };


  return (
    <div className="ui container">
      <Router>
        <Routes>
          <Route path="/" exact element={ <LoginForm /> } />

          <Route path="/signup" element={ <SignUpForm /> } />

          <Route path="/dashboard" element={< ContactList contacts = {searchTerm.length < 1 ? contacts : searchResults}
            getContactId = {removeContactHandler} term = {searchTerm} searchKeyword = {searchHandler} />} />

          <Route path="/add" element={<AddContacts addContactHandler={addContactHandler}/>}/>

          <Route path="/edit"
            element={<EditContact updateContactHandler={updateContactHandler} />}/>  

          <Route path="/contact/:id" component={ContactDetail} />
        </Routes>
      </Router>
    </div>
  );
  updateContactHandler = (updatedDetails) => {
    // Implement the logic to update the contact details
    console.log('Updated Contact Details:', updatedDetails);
  };
}

export default App;
