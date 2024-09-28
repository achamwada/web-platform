import winston, { format, transports } from "winston";

interface LogMessage {
  message: string;
  service?: string;
  journey?: string;
  data?: any; // Can be further refined based on the expected data structure
  verbose?: boolean;
}

class LogService {
  private static instance: LogService;
  private logger: winston.Logger;

  private constructor() {
    this.logger = winston.createLogger({
      level: "info",
      transports: [
        new transports.Console(),
        // Uncomment to enable file transport
        // new transports.File({ filename: "combined.log" }),
      ],
    });
  }

  public static getInstance(): LogService {
    if (!LogService.instance) {
      LogService.instance = new LogService();
    }
    return LogService.instance;
  }

  private setLoggerFormat(verbose: boolean): void {
    this.logger.format = verbose
      ? format.combine(format.timestamp(), format.json())
      : format.combine(format.simple());
  }

  private logMessage(level: string, logMessage: LogMessage): void {
    const { message, service, journey, data, verbose = false } = logMessage;
    this.setLoggerFormat(verbose);
    this.logger.log(level, message, { service, journey, data });
  }

  public info(logMessage: LogMessage): void {
    this.logMessage("info", logMessage);
  }

  public warn(logMessage: LogMessage): void {
    this.logMessage("warn", logMessage);
  }

  public error(logMessage: LogMessage): void {
    this.logMessage("error", logMessage);
  }

  public debug(logMessage: LogMessage): void {
    this.logMessage("debug", logMessage);
  }
}

export default LogService.getInstance();
