import winston from "winston";
import { LOG_LEVEL_DEBUG } from "../../constants/log-levels";

const {
    createLogger: createWinstonLogger,
    transports: { Console },
    format: { combine, timestamp, printf },
} = winston;

export default (logConfig: any, DEFAULT_LABEL = "Application") => {
    const logger = createWinstonLogger({});
    const applicationLogFormat = printf((info): any => {
        if (/error/.test(info.level)) {
            return `${info.timestamp} - ${info.level}: ${info.label || DEFAULT_LABEL}: ${info.message}`;
        } else {
            return `${info.timestamp} - ${info.level}: ${info.label || DEFAULT_LABEL}: ${info.message}`;
        }
    });

    if (logConfig.console && logConfig.console.enabled === true) {
        logger.add(
            new Console({
                level: logConfig.console.level || LOG_LEVEL_DEBUG,
                format: combine(timestamp(), applicationLogFormat),
            })
        );
    }

    logger.stream = function (label): any {
        return {
            write(message: any) {
                logger.info({ label, message: message.trim() });
            },
        };
    };

    return logger;
};
