import { LogEntity, LogSeverityLevel } from '../../entities/log.entity'
import { LogRepository } from '../../repository/log.repository'

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>
}

type SuccessCallback = (() => void) | undefined
type ErroCallBack = ((error: string) => void) | undefined

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErroCallBack,
  ) {}

  async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url)
      if (!req.ok) {
        throw new Error('Error on Check Service url ' + url)
      }
      // const log = new LogEntity(`Service ${url} ok`, LogSeverityLevel.low)
      const log = new LogEntity({
        message: `Service ${url} ok`,
        level: LogSeverityLevel.low,
        createdAt: new Date(),
        origin: 'check-service.ts',
      })

      this.logRepository.saveLog(log)
      this.successCallback && this.successCallback()
      return true
    } catch (error) {
      // const errorMessage = new LogEntity(`${error}`, LogSeverityLevel.high)
      const errorMessage = new LogEntity({
        message: `${error}`,
        level: LogSeverityLevel.high,
        createdAt: new Date(),
        origin: 'check-service.ts',
      })
      this.logRepository.saveLog(errorMessage)
      this.errorCallback && this.errorCallback(`${error}`)
      return false
    }
  }
}
