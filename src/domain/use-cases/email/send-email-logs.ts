import { EmailService } from '../../../presentation/email/email.service'
import { LogEntity, LogSeverityLevel } from '../../entities/log.entity'
import { LogRepository } from '../../repository/log.repository'
interface SendEmailUseCase {
  execute(to: string | string[]): Promise<boolean>
}

export class sendEmailLogs implements SendEmailUseCase {
  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository,
  ) {}

  async execute(to: string | string[]): Promise<boolean> {
    try {
      const send = await this.emailService.sendEmailWIthFileSystemLogs(to)
      if (!send) throw new Error('email was not send')
      const log = new LogEntity({
        message: `Email sent to ${to}`,
        level: LogSeverityLevel.low,
        createdAt: new Date(),
        origin: 'send-email-logs.ts',
      })
      this.logRepository.saveLog(log)

      return true
    } catch (error) {
      const log = new LogEntity({
        message: `${error}`,
        level: LogSeverityLevel.high,
        createdAt: new Date(),
        origin: 'send-email-logs.ts',
      })
      this.logRepository.saveLog(log)

      return false
    }
  }
}
