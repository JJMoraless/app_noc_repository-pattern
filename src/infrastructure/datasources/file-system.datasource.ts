import fs from 'fs'

import { LogDataSource } from '../../domain/datasources/log.datasource'
import { LogSeverityLevel, LogEntity } from '../../domain/entities/log.entity'

export class FileSystemDatasource implements LogDataSource {
  private readonly logPath: string = 'logs/'
  private readonly allLogsPath: string = 'logs/logs-low.log'
  private readonly mediumLogsPath: string = 'logs/.logs-medium.log'
  private readonly higtLogsPath: string = 'logs/.logs-high.log'

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

    if (newLog.level === LogSeverityLevel.low) {
      fs.appendFileSync(this.mediumLogsPath, logAsJson)
    } else {
      fs.appendFileSync(this.higtLogsPath, logAsJson)
    }
  }

  getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    throw new Error('Method not implemented.')
  }
}
