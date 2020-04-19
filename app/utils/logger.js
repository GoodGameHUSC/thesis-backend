import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple()
    }),
    new winston.transports.File({ filename: '_log/combined.log' })
  ]
});

// if (process.env.NODE_ENV == 'production') {
logger.add(new winston.transports.File({ filename: '_log/error.log', level: 'error' }));
logger.add(new winston.transports.File({ filename: '_log/http.log', level: 'http' }))

// }


export default logger;