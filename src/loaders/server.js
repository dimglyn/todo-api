import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';

export default async ({ server }) => {
  server.express.use(bodyParser.json());
  server.express.use(morgan('combined'));
  server.express.use(cors());
};
