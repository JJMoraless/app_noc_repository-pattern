import { LogEntity, LogSeverityLevel } from '../entities/log.entity'
// Enforce the behavior of the abstract class over other classes
// Business rules for data sources

// If the datasource does not comply with the business rules,
// it will be considered a datasource for our logs

export abstract class LogDataSource {
  abstract saveLog(log: LogEntity): Promise<void>
  abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>
}
