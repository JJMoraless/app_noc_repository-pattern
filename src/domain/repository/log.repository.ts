import { LogSeverityLevel, LogEntity } from '../entities/log.entity'

export abstract class LogRepository {
  abstract saveLog(log: string): Promise<void>
  abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>
}
