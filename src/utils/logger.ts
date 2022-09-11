import { createLogger, format, transports, Logger } from "winston";

const customFormat = format.combine(
  format.errors({ stack: true }),
  format.label({ label: "BACKEND" }),
  format.timestamp({ format: "MM/DD/YYYY HH:mm:ss" }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  format.printf((info: any): string => {
    const { timestamp, label, level, message, event, ...rest } = info;
    return `[${timestamp}][${label}][${level.toUpperCase()}]${
      event ? `[${event}]` : ""
    }: ${message}${
      Object.keys(rest).length ? `\n${JSON.stringify(rest, null, 2)}` : ""
    }`;
  })
);

const logger = createLogger({
  level:
    process.env.NODE_ENV === "production" ||
    process.env.NODE_ENV === "dev" ||
    process.env.NODE_ENV === "staging"
      ? "info"
      : "debug",
  format: customFormat,
  transports: [
    new transports.File({ filename: "error.log", level: "error" }),
    new transports.File({ filename: "combined.log" }),
    new transports.Console({ format: customFormat }),
  ],
});

/**
 * Used to override the logger meta
 * ex: adding the service to the logger
 */
export const createChildLogger = (service: string): Logger => {
  return logger.child({ service });
};

export default logger;
