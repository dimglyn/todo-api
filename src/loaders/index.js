import serverLoader from './server';
import mongooseLoader from './mongoose';
import logger from '../util/logger';

export default async ({ server }) => {
  await mongooseLoader();
  logger.info('DB Connected');
  await serverLoader({ server });
};
