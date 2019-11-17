import { GraphQLServer } from 'graphql-yoga'
import morgan from 'morgan'
import { MONGOURI } from '../config'
import cors from 'cors'
import logger from './util/logger'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Mutation  
  },
})

server.express.use(bodyParser.json())
server.express.use(morgan('combined'))
server.express.use(cors())
server.express.use(morgan('combined'))

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