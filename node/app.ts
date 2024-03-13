//=====================import=====================//
import express from 'express'
import mongoose from 'mongoose'
import * as config from './config.json'
import {typeDefs} from './graphql/schema/typeDefs'
import { mutationResolvers } from './graphql/resolvers/mutations.resolver.ts'
import { queryResolvers } from './graphql/resolvers/queries.resolver.ts'
import { subscriptionResolvers } from './graphql/resolvers/subscriptions.resolver.ts'
import cors from 'cors'
import { createServer } from 'http';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const {ApolloServer} = require('apollo-server-express')
const { SubscriptionServer } = require('subscriptions-transport-ws');
import { execute, subscribe } from 'graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
// import { ApolloServer } from 'apollo-server'
//===============================ON SERVER START =============================

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  accessControlAllowOrigin: "*",
  accessControlAllowCredentials: true,
};

//===============================Graphql Data =============================//

( async () => {

  const app = express();

  app.use(cors(corsOptions));

  //Parse Incoming JSON
  app.use(express.json());

  const resolversArray = [mutationResolvers, subscriptionResolvers, queryResolvers]

  const schema = makeExecutableSchema({ typeDefs, resolvers: resolversArray });

  const httpServer = createServer(app);
  
  SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
    },
    {
      server: httpServer,
      path: '/graphql',
    }
  );
  
  
  const apolloServer = new ApolloServer({
    schema,
    plugins: [
      {
         async serverWillStart(){
          return{
            async drainsServer() {
              await SubscriptionServer.close()
            }
          }
         }
      }
    ]
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  const connectToDatabase = async (): Promise<void> => {
    try {
  
      await mongoose.connect(`mongodb+srv://${config.mongo.MONGO_USER}:${config.mongo.MONGO_PASSWORD}@cluster0.pj7djsr.mongodb.net/${config.mongo.MONGO_DB}`);
  
      console.log('Connected to MongoDB');
    } catch (error: any) {
      console.error('Error connecting to MongoDB:', error.message);
    }
  };
  // Call the connectToDatabase function to initiate the connection
  connectToDatabase();

//Listen On Specific Port
const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => console.log("Listening on " + PORT));

})();


//===============================Connecting to DB =============================//



