const winston = require('winston');

const logger = winston.createLogger({
    defaultMeta: {
        service: 'todoApp-service'
    },
    format: winston.format.json(),
    level: 'info',
    transports: [
        new winston.transports.File({
            filename: 'log/error.log',
            level: 'error'
        }),
        new winston.transports.File({
            filename: 'log/combined.log'
        })
    ]
});
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

module.exports = logger;