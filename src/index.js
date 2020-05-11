import bodyParser from 'body-parser';
import { GraphQLServer } from 'graphql-yoga';

import initApp from './loaders';
import logger from './util/logger';

import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Todo from './resolvers/Todo';
import User from './resolvers/User';
import isLoggedIn from './middleware/auth';

const permissions = {
  Query: {
    todos: isLoggedIn,
    todo: isLoggedIn,
  },
  Mutation: {
    createTodo: isLoggedIn,
    deleteTodo: isLoggedIn,
    updateTodo: isLoggedIn,
    markDone: isLoggedIn,
    markUnDone: isLoggedIn,
  },
};

const startServer = async () => {
  const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: {
      Query,
      Mutation,
      Todo,
      User,
    },
    context: (req) => ({ ...req }),
    middlewares: [permissions],
  });

  await initApp({ server });
  server.express.use(bodyParser.json());

  server.start(() => {
    logger.info('GraphQL server is up!');
  });
};

startServer();
