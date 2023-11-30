import { LogModel } from '../../data/mongo'
import { LogDataSource } from '../../domain/datasources/log.datasource'
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity'

export class MongoLogDatasource implements LogDataSource {
  async saveLog(log: LogEntity): Promise<void> {
    const newLog = await LogModel.create(log)
    // await newLog.save()
    console.log('Mongo log created', newLog._id)
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const logs = await LogModel.find({ level: severityLevel })
    const logsEntity = logs.map(LogEntity.fromObject)
    return logsEntity
  }
}
