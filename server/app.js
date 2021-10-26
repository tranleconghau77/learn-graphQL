

const express = require('express')
const dotenv = require("dotenv");
dotenv.config();
const { ApolloServer } = require('apollo-server-express')
const mongoose = require('mongoose')

//Load schema and resolvers
const typeDefs = require('./schema/schema');
const resolvers = require('./resolver/resolver')


//Load db methods
const mongoDataMethods = require('./data/db')


//Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true, useUnifiedTopology: true
        })
        console.log("DB connected")
    } catch (error) {
        console.log(error.message)
        process.exit(1);
    }
}
connectDB();


async function startApolloServer(typeDefs, resolvers) {
    const server = new ApolloServer({ typeDefs, resolvers, context: () => ({ mongoDataMethods }) })
    const app = express();
    await server.start();
    server.applyMiddleware({ app, path: '/graphql' });

    app.listen({ port: 4000 }, () => {
        console.log(`Server is listening on port http://localhost:4000${server.graphqlPath}`);
    })
}

startApolloServer(typeDefs, resolvers);