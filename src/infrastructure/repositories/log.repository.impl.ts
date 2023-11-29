import { LogSeverityLevel, LogEntity } from '../../domain/entities/log.entity'
import { LogRepository } from '../../domain/repository/log.repository'
import { LogDataSource } from '../../domain/datasources/log.datasource'

export class LogRepositoryImpl implements LogRepository {
  constructor(private readonly logDataSource: LogDataSource) {}

  async saveLog(log: LogEntity): Promise<void> {
    this.logDataSource.saveLog(log)
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    return this.logDataSource.getLogs(severityLevel)
  }
}
