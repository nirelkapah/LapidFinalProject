import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Layout from "./components/layout/layout";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { split , HttpLink } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from '@apollo/react-hooks'

const httpLink = new HttpLink({
  uri: 'http://localhost:3001/graphql'
})

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:3001/graphql',
  options: {
    reconnect: true
  }
})

// Create a split link based on the operation type
//If you are trying to subscribe , use the websocket
//Else, use the httpLink
const splitLink = split(
  // split based on the operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  // Use the WebSocket link for subscriptions
  wsLink,
  // Use the HTTP link for queries and mutations
  httpLink,
);

const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
});


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ApolloProvider client={apolloClient}>
      <Provider store={store}>
          <React.StrictMode>
          <Layout />
          </React.StrictMode>
      </Provider>
  </ApolloProvider>

);
