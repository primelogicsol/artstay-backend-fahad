import winston from 'winston';
import { env } from '~/env';
import path from 'path';
import fs from 'fs';

// Define custom log levels
interface LogLevels {
  error: number;
  warn: number;
  info: number;
  http: number;
  debug: number;
}

// Define metadata type for logging
interface LogMetadata {
  [key: string]: unknown;
}

// Define the log level colors
interface LogColors {
  error: string;
  warn: string;
  info: string;
  http: string;
  debug: string;
  [key: string]: string;
}

const levels: LogLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = (): keyof LogLevels => {
  const isDevelopment = env.NODE_ENV === 'development';
  return isDevelopment ? 'debug' : 'warn';
};

const colors: LogColors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
};

winston.addColors(colors);

// Define error details interface
interface ErrorDetails {
  message: string;
  stack: string | null;
}

// Define ErrorLike interface
interface ErrorLike {
  message?: string;
  stack?: string;
}

// Create a function to properly extract error details
const formatError = (info: winston.Logform.TransformableInfo): ErrorDetails => {
  // Check if the message is an error object
  if (info.message instanceof Error) {
    return {
      message: info.message.message,
      stack: info.message.stack || null
    };
  }
  
  // Check if the message contains an error (when using logger.error(new Error()))
  if (typeof info.message === 'object' && info.message !== null) {
    const errorObj = info.message as ErrorLike;
    return {
      message: errorObj.message || JSON.stringify(errorObj),
      stack: errorObj.stack || null
    };
  }
  
  // Default case for string messages
  return {
    message: String(info.message),
    stack: null
  };
};

// Shared format function between console and file transports
const baseFormatContent = (info: winston.Logform.TransformableInfo): string => {
  // Extract error details if present
  const errorDetails = formatError(info);
  
  // Get any metadata, excluding standard winston properties
  const excludedKeys = ['level', 'message', 'timestamp', 'stack', 'label', 'ms'];
  const metadata = Object.keys(info)
    .filter(key => !excludedKeys.includes(key))
    .reduce<Record<string, unknown>>((obj, key) => {
      obj[key] = info[key];
      return obj;
    }, {});
  
  // Format the log message
  let output = `[${info.timestamp}] ${info.level}: ${errorDetails.message}`;
  
  // Add stack trace if exists
  if (errorDetails.stack) {
    output += `\n${errorDetails.stack}`;
  }
  
  // Add metadata if exists (and it's not empty)
  if (Object.keys(metadata).length > 0) {
    output += `\nMetadata: ${JSON.stringify(metadata, null, 2)}`;
  }
  
  return output;
};

// Create custom format for console output
const consoleFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(info => baseFormatContent(info))
);

// Create custom format for file output (without colors)
const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.uncolorize(),
  winston.format.printf(info => baseFormatContent(info))
);

// Function to create daily folder
const createDailyFolder = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const folderPath = path.join('logs', `${year}-${month}-${day}`);
  
  // Create logs directory if it doesn't exist
  if (!fs.existsSync('logs')) {
    fs.mkdirSync('logs');
  }
  
  // Create daily folder if it doesn't exist
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
  
  return folderPath;
};

// Create console transport with proper formatting
const consoleTransport = new winston.transports.Console({
  format: consoleFormat
});

// Custom transport for daily rotating files
const dailyErrorTransport = new winston.transports.File({
  filename: path.join(createDailyFolder(), 'error.log'),
  level: 'error',
  format: fileFormat
});

// Create the logger instance with explicit typing
export const logger = winston.createLogger({
  level: level(),
  levels: levels as unknown as winston.config.AbstractConfigSetLevels,
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true })
  ),
  transports: [
    consoleTransport,
    dailyErrorTransport
  ],
  // Handle uncaught exceptions and unhandled rejections
  exceptionHandlers: [
    new winston.transports.File({ 
      filename: path.join(createDailyFolder(), 'exceptions.log'),
      format: fileFormat
    })
  ],
  rejectionHandlers: [
    new winston.transports.File({ 
      filename: path.join(createDailyFolder(), 'rejections.log'),
      format: fileFormat
    })
  ],
  exitOnError: false
}) as winston.Logger;

// Add error handling for the file transport
dailyErrorTransport.on('error', (error: Error) => {
  console.error('Error writing to log file:', error);
});

// Type-safe helper functions for easier usage
export const logError = (message: string | Error, metadata: LogMetadata = {}): void => {
  logger.error(message instanceof Error ? message.message : message, metadata);
};

export const logInfo = (message: string, metadata: LogMetadata = {}): void => {
  logger.info(message, metadata);
};

export const logWarn = (message: string, metadata: LogMetadata = {}): void => {
  logger.warn(message, metadata);
};

export const logDebug = (message: string, metadata: LogMetadata = {}): void => {
  logger.debug(message, metadata);
};

export const logHttp = (message: string, metadata: LogMetadata = {}): void => {
  logger.http(message, metadata);
};

// Type-safe wrapper for the entire logger
export type TypedLogger = {
  error: (message: string | Error, metadata?: LogMetadata) => void;
  warn: (message: string, metadata?: LogMetadata) => void;
  info: (message: string, metadata?: LogMetadata) => void;
  http: (message: string, metadata?: LogMetadata) => void;
  debug: (message: string, metadata?: LogMetadata) => void;
}

// Export the typed logger for proper type checking
export const typedLogger: TypedLogger = {
  error: (message, metadata = {}) => logger.error(message instanceof Error ? message.message : message, metadata),
  warn: (message, metadata = {}) => logger.warn(message, metadata),
  info: (message, metadata = {}) => logger.info(message, metadata),
  http: (message, metadata = {}) => logger.http(message, metadata),
  debug: (message, metadata = {}) => logger.debug(message, metadata),
};

// Examples:
// typedLogger.error('This is a type-safe error', { userId: 123 });
// typedLogger.error(new Error('Error with stack trace'));
// logError('Authentication failed', { userId: 456, attempt: 3 });