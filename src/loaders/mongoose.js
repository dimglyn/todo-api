import { MONGOURI } from '../../config'
import mongoose from 'mongoose'
import logger from '../util/logger'

export default async () => {
  await mongoose.connect(MONGOURI, {
    useNewUrlParser: true
  })

  logger.info(`Mongoose connected on: ${MONGOURI}`)
  return mongoose.connection.db
}