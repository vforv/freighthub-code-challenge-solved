import * as winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'MM-DD-YYYY HH:mm:ss'
    }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      filename: 'error.log', level: 'error'
    }),
    new winston.transports.File({
      filename: 'combined.log'
    }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.splat(),
        winston.format.simple()
      )
    })
  ]
});

export { logger };
