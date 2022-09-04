import { ApolloServer } from 'apollo-server';
import {
  ApolloServerPluginLandingPageGraphQLPlayground
} from "apollo-server-core";
import { env } from 'process';
import typeDefs from './schema';
import { Category } from './resolvers/Category';
import { Mutation } from './resolvers/Mutation';
import { Product } from './resolvers/Product';
import { Query } from './resolvers/Query';
import db from './db';

const URL: string = env.NODE_ENV === 'production' ? 'https://sa-graphql-ecom-api.herokuapp.com/grapql/api' : 'http://localhost:5000/grapqhl/api';

const server: ApolloServer = new ApolloServer({
  uri: URL,
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

server.listen(process.env.PORT || 5000).then(({ url }) => {
  console.log('Server running at ' + url);
});
