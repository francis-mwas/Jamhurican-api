import { createLogger, format, transports } from 'winston';
import { config } from 'dotenv';

config();

// Basic logging format that is easier to read on the console
const basicConsoleFormat = format.printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

/** Create basic console output that is easier to read.
 * @param level {string} - Pass minimum log level to capture
 * @returns transports.Console - Winston Console transport instance
 */
const basicConsole = (level = 'error') =>
  new transports.Console({
    format: format.combine(format.colorize(), basicConsoleFormat),
    level,
  });

const debugConsole = () =>
  new transports.Console({
    format: format.combine(
      format.colorize(),
      basicConsoleFormat,
      format.errors({ stack: true })
    ),
    level: `debug`,
  });

// We create our default logger with all the default settings and transports
const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
    format.prettyPrint()
  ),
  transports: [
    new transports.File({
      dirname: '.logs/main/stderr',
      filename: 'jamurican-main.error.log',
      level: 'error',
    }),
    new transports.File({
      dirname: '.logs/main/stderr',
      filename: 'jamurican-main.warn.log',
      level: 'warn',
    }),
    new transports.File({
      dirname: '.logs/main',
      filename: 'jamurican-main.info.log',
    }),
    basicConsole('info'),
  ],
  exitOnError: false,
  // log all unhandled exceptions that are caught in this file
  exceptionHandlers: [
    new transports.File({
      dirname: '.logs/main/',
      filename: 'unhandled-exceptions.log',
    }),
    basicConsole('info'),
  ],
  // log all unhandled promise rejections to this file
  rejectionHandlers: [
    new transports.File({
      dirname: '.logs/main/',
      filename: 'unhandled-rejections.log',
    }),
    basicConsole('info'),
  ],
});

if (process.env.DEBUG === 'true') {
  // when DEBUG is enabled, we don't want the logs saved in the same directory as our `main` logs. Also, we enable
  // printing of stack traces on the console for faster debugging
  logger.configure({
    level: 'debug',
    transports: [
      debugConsole(),
      new transports.File({
        dirname: '.logs/debug',
        filename: 'jamhurican-DEBUG.info.log',
        level: 'info',
      }),
      new transports.File({
        dirname: '.logs/debug',
        filename: 'jamhurican-DEBUG.warn.log',
        level: 'warn',
      }),
    ],
    exitOnError: true,
    // log all unhandled exceptions that are caught in this file
    exceptionHandlers: [
      new transports.File({
        dirname: '.logs/debug',
        filename: 'unhandled-exceptions.log',
      }),
      debugConsole(),
    ],
    // log all unhandled promise rejections to this file
    rejectionHandlers: [
      new transports.File({
        dirname: '.logs/debug',
        filename: 'unhandled-rejections.log',
      }),
      debugConsole(),
    ],
  });

  logger.debug(
    'DEBUG is enabled. Using the DEBUG logger configuration instead.'
  );
}

export default logger;
