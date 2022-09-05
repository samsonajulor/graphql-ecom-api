import { ApolloServer } from 'apollo-server';
import {
  ApolloServerPluginLandingPageGraphQLPlayground
} from "apollo-server-core";
import typeDefs from './schema';
import { Category } from './resolvers/Category';
import { Mutation } from './resolvers/Mutation';
import { Product } from './resolvers/Product';
import { Query } from './resolvers/Query';
import db from './db';

const server: ApolloServer = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    Product,
    Category,
  },
  context: {
    db
  },
  csrfPrevention: true,
  cache: "bounded",
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground(),
  ],
});

server.listen({ port: process.env.PORT || 5000 }).then(({ url }) => {
  console.log(`
    🚀  Server is ready at ${url}
    📭  Query at https://sa-graphql-ecom-api.herokuapp.com/
  `);
});
