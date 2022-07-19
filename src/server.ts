import { ApolloServer } from 'apollo-server';
import { Category } from './resolvers/Category';
import db from './db';

const server: ApolloServer = new ApolloServer({
  resolvers: {
    Category,
  },
  context: {
    db
  },
});

server.listen().then(({ url }) => {
  console.log('Server running at ' + url);
});
