// entities, whose will gobert our aplications

export enum LogSeverityLevel {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export interface LogEntityOptions {
  message: string
  level: LogSeverityLevel
  origin: string
  createdAt?: Date
}

export class LogEntity {
  public createdAt: Date
  public message: string
  public level: LogSeverityLevel
  public origin: string
  public createedAt: Date

  constructor(options: LogEntityOptions) {
    const { level, message, origin, createdAt = new Date() } = options
    this.createdAt = createdAt
    this.message = message
    this.level = level
    this.origin = origin
    this.createedAt = new Date()
  }

  static fromJson(json: string): LogEntity {
    const { message, level, createdAt, origin } = JSON.parse(json)
    const log: LogEntity = new LogEntity({
      message,
      level,
      createdAt,
      origin,
    })
    return log
  }
}
