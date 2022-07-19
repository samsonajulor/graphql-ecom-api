import { ApolloServer } from 'apollo-server';

const server: ApolloServer = new ApolloServer({
  resolvers: {
  },
  context: {
  },
});

server.listen().then(({ url }) => {
  console.log('Server running at ' + url);
});
