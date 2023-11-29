import fs from 'fs'

import { LogDataSource } from '../../domain/datasources/log.datasource'
import { LogSeverityLevel, LogEntity } from '../../domain/entities/log.entity'

export class FileSystemDatasource implements LogDataSource {
  private readonly logPath: string = 'logs/'
  private readonly allLogsPath: string = 'logs/logs-low.log'
  private readonly mediumLogsPath: string = 'logs/logs-medium.log'
  private readonly higtLogsPath: string = 'logs/logs-high.log'

  constructor() {
    this.createLogsFiles()
  }

  private createLogsFiles = () => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath)
    }

    const paths = [this.allLogsPath, this.mediumLogsPath, this.higtLogsPath]
    paths.forEach((path) => {
      if (fs.existsSync(path)) return
      fs.writeFileSync(path, '')
    })
  }

  async saveLog(newLog: LogEntity): Promise<void> {
    const logAsJson = `${JSON.stringify(newLog)}\n`
    fs.appendFileSync(this.allLogsPath, logAsJson)

    const optionsToSaveByLevel = {
      [LogSeverityLevel.low]: () =>
        fs.appendFileSync(this.allLogsPath, logAsJson),

      [LogSeverityLevel.high]: () =>
        fs.appendFileSync(this.higtLogsPath, logAsJson),

      [LogSeverityLevel.medium]: () =>
        fs.appendFileSync(this.mediumLogsPath, logAsJson),
    }

    optionsToSaveByLevel[newLog.level]()
  }

  private getLogsByFile = (filePath: string): LogEntity[] => {
    const content = fs.readFileSync(filePath, 'utf-8')
    const logs = content.split('\n').map(LogEntity.fromJson)
    return logs
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const LOGS_PATH_BY_SEVERITY = {
      [LogSeverityLevel.low]: this.allLogsPath,
      [LogSeverityLevel.medium]: this.mediumLogsPath,
      [LogSeverityLevel.high]: this.higtLogsPath,
    }

    const logPath = LOGS_PATH_BY_SEVERITY[severityLevel]
    if (!logPath) throw new Error(`Not valid severity ${severityLevel}`)
    return this.getLogsByFile(logPath)
  }
}
