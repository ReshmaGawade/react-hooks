import { useQuery, gql } from '@apollo/client';
import { useMutation } from '@apollo/client';


const GET_CONTACTS = gql`
query GetContacts {
  contacts {
    id
    name
    email
  }
}
`;

export function GetConactsList() {
    const { loading, error, data } = useQuery(GET_CONTACTS);

    if (loading) {
      const handleRefetch = () => {
        GetConactsList();
      };
      return;
    }
    if (error) return <p>Error : {error.message}</p>;  
    return data;
}


//////////////////////////////////////////////////////////////////////////////////////

const ADD_CONTACT = gql`
  mutation AddContact($name: String, $email: String) {
    addContact(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

export {ADD_CONTACT};

/////////////////////////////////////////////////////////////////////////////////////////

const UPDATE_CONTACT = gql`
  mutation UpdateContact($id: ID!, $name: String, $email: String) {
    updateContact(id: $id, name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

export {UPDATE_CONTACT};

////////////////////////////////////////////////////////////////////////////////////////////
