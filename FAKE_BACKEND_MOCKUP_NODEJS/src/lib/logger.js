import winston from 'winston';

const { combine, timestamp, label, prettyPrint } = winston.format;

const Logger = winston.createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        prettyPrint()
    ),
    defaultMeta: { 
        service: 'application' 
    },
    transports: [
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //
        new winston.transports.File({ filename: 'logs/error.log', level: 'error'}),
        new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
});

export default Logger;