import { GraphQLServer } from 'graphql-yoga'
import morgan from 'morgan'
import { MONGOURI } from '../config'
import cors from 'cors'
import logger from './util/logger'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import Todo from './resolvers/Todo'
import User from './resolvers/User'
import { isLoggedIn } from './middleware/auth'

const permissions = {
  Query: {
    todos: isLoggedIn,
    todo: isLoggedIn
  },
  Mutation: {
    createTodo: isLoggedIn,
    deleteTodo: isLoggedIn,
    updateTodo: isLoggedIn,
    markDone: isLoggedIn,
    markUnDone: isLoggedIn
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    Todo,
    User
  },
  context: req => ({...req}),
  middlewares: [permissions]
})

server.express.use(bodyParser.json())
server.express.use(morgan('combined'))
server.express.use(cors())

server.start(() =>{ 
  console.log('GraphQL server is up!')
})

mongoose.connect(MONGOURI, {
    useNewUrlParser: true
  })
  .then(() => {
    logger.info(`Mongoose connected on: ${MONGOURI}`)
  })
  .catch(err => logger.error(err))