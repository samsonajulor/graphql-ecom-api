import { ApolloServer } from 'apollo-server';
import db from './db';

const server: ApolloServer = new ApolloServer({
  resolvers: {
  },
  context: {
    db
  },
});

server.listen().then(({ url }) => {
  console.log('Server running at ' + url);
});
