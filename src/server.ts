import { ApolloServer } from 'apollo-server';
import typeDefs from './schema';
import { Category } from './resolvers/Category';
import { Mutation } from './resolvers/Mutation';
import { Product } from './resolvers/Product';
import db from './db';

const server: ApolloServer = new ApolloServer({
  typeDefs,
  resolvers: {
    Mutation,
    Product,
    Category,
  },
  context: {
    db
  },
});

server.listen().then(({ url }) => {
  console.log('Server running at ' + url);
});
