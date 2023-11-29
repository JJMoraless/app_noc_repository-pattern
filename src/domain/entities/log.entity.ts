// entities, whose will gobert our aplications

export enum LogSeverityLevel {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export class LogEntity {
  public createdAt: Date


  constructor(public message: string, public level: LogSeverityLevel) {
    this.createdAt = new Date()
  }

  static fromJson(json: string): LogEntity {
    const { message, level, createdAt } = JSON.parse(json)
    const log: LogEntity = new LogEntity(message, level)
    log.createdAt = new Date(createdAt)
    return log
  }
}
