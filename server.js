require('dotenv').config();
import http from 'http';
import express from 'express';
import { typeDefs, resolvers } from './schema';
import { getUser, protectResolver } from './users/users.utils';
import { ApolloServer } from 'apollo-server-express';
import logger from 'morgan';

const PORT = process.env.PORT;
const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  context: async (ctx) => {
    if (ctx.req) {
      return {
        loggedInUser: await getUser(ctx.req.headers.token),
      };
    } else {
      const {
        connection: { context },
      } = ctx;
      return { loggedInUser: context.loggedInUser };
    }
  },
  subscriptions: {
    onConnect: async ({ token }) => {
      if (!token) {
        throw new Error('you can`t listen');
      }
      const loggedInUser = await getUser(token);
      return {
        loggedInUser,
      };
    },
  },
});

const app = express();
app.use(logger('tiny')); //
apollo.applyMiddleware({ app }); //같이 동작해라 서버

app.use('/static', express.static('uploads'));

const httpServer = http.createServer(app);
apollo.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
