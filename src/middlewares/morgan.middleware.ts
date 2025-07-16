import morgan from 'morgan';
import { logger } from '~/utils/logger';

const stream = {
  write: (message: string) => logger.http(message.trim()),
};

export const morganMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  { stream }
);