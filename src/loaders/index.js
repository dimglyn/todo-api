import serverLoader from './server'
import mongooseLoader from './mongoose'
import logger from '../util/logger'

export default async ({ server }) => {
  const mongoConnection = await mongooseLoader();
  logger.info('DB Connected')
  await serverLoader({server})
}