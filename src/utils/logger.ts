import { createLogger, format, transports } from "winston";
import "winston-daily-rotate-file";

const logFormat = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.printf(
    (info) => `[${info.timestamp}] ${info.level.toUpperCase()}: ${info.message}`
  )
);

// Daily rotating file transport
const dailyRotateFileTransport = new transports.DailyRotateFile({
  dirname: "logs", // Directory where logs are stored
  filename: "%DATE%-app.log", // Log file name pattern (e.g., 2025-01-28-app.log)
  datePattern: "YYYY-MM-DD", // Creates a new log file daily
  zippedArchive: true, // Compress old log files
  maxSize: "20m", // Maximum size of a single log file
  maxFiles: "14d", // Retains logs for the last 14 days
});

const logger = createLogger({
  level: "debug",
  format: logFormat,
  transports: [
    dailyRotateFileTransport,
    new transports.Console({ format: format.simple() }),
  ],
  exceptionHandlers: [
    new transports.File({ dirname: "logs", filename: "exceptions.log" }),
  ],
});

export default logger;
