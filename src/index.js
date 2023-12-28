import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./components/App";
import { ApolloProvider } from '@apollo/client';
import Client from "./api/ApolloClientt"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={Client}>
    <App />
  </ApolloProvider>,
);