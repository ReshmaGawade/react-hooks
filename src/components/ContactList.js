import React , {useRef} from "react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";

const ContactList = (props) => {
  const inputRef = useRef("");
  const deleteConactHandler = (id) => {
    props.getContactId(id);
  };

  const renderContactList = props.contacts.map((contact) => {
    return (
      <ContactCard
        contact={contact}
        clickHander={deleteConactHandler}
        key={contact.id}
      />
    );
  });

  const getSearchTerm = () => {
    props.searchKeyword(inputRef.current.value);
  };

  return (
    <div className="main">
      <h2>
        Contact List
        <Link to="/add">
          <button className="ui button blue right">Add Contact</button>
        </Link>
      </h2>
      <div className="ui search">
        <div className="ui icon input">
          <input ref={inputRef} type="text" placeholder="Search contacts" className="prompt" value={props.term} onChange={getSearchTerm}></input>
          <i className="search icon"></i>
        </div>
      </div>
      <div className="ui celled list">{renderContactList}</div>
    </div>
  );
};

export default ContactList;
