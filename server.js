require('dotenv').config();
import express from 'express';
import { typeDefs, resolvers } from './schema';
import { getUser, protectResolver } from './users/users.utils';
import { ApolloServer } from 'apollo-server-express';
import logger from 'morgan';

const PORT = process.env.PORT;
const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    console.log(req.headers);
    return {
      loggedInUser: await getUser(req.headers.token),
      protectResolver,
    };
  },
});

const app = express();
app.use(logger('tiny')); //
apollo.applyMiddleware({ app }); //같이 동작해라 서버
app.use('/static', express.static('uploads'));
app.listen({ port: PORT }, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
