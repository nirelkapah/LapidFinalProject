//=====================import=====================//
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const { graphqlHTTP } = require('express-graphql');
const config = require('./config.json');
const graphQlSchema = require('./graphql/schema/index')
const graphQlResolvers = require('./graphql/resolvers/index')
const cors = require('cors');


//===============================ON SERVER START =============================


//Use Cors
// app.use(cors({ origin: "http://localhost:4200", credentials: true
// }));

const corsOptions = {
    origin: '*',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    accessControlAllowOrigin: '*',
    accessControlAllowCredentials: true,
}

app.use(cors(corsOptions))

//Parse Incoming JSON
app.use(express.json());

//===============================Graphql Data =============================//


app.use('/graphql' , graphqlHTTP({
    schema: graphQlSchema, 
    rootValue: graphQlResolvers,
    graphiql: true
})
);

//===============================Connecting to DB =============================//
mongoose.connect(
    `mongodb+srv://${config.mongo.MONGO_USER}:${config.mongo.MONGO_PASSWORD}@cluster0.pj7djsr.mongodb.net/${config.mongo.MONGO_DB}`
).then(response => console.log("Connected To MongoDB")).catch(err => {
    console.log(err)
})

//Listen On Specific Port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log('Listening on ' + PORT));


