//=====================import=====================//
const express = require("express");
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");
const config = require("./config.json");
const typeDefs = require("./graphql/schema/typeDefs");
const resolvers = require("./graphql/resolvers/resolvers");
const cors = require("cors");
const { createServer } = require('http');
const { ApolloServer } = require('apollo-server-express');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { execute, subscribe } = require('graphql');
const { makeExecutableSchema } = require('@graphql-tools/schema');

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

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const server = createServer(app);
  
  SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
    },
    {
      server,
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
server.listen(PORT, () => console.log("Listening on " + PORT));

})();


//===============================Connecting to DB =============================//


