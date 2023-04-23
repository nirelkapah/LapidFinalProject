import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Layout from './components/layout/layout'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { store } from './redux/store'
import { Provider } from 'react-redux'



const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
});


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  
  <React.StrictMode>
      <Provider store={store}>
        <ApolloProvider client={client}>
        <Layout />
        </ApolloProvider>
      </Provider>,
  </React.StrictMode>,
)
