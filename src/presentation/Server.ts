import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource'
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl'
import { EmailService } from './email/email.service'

import { LogSeverityLevel } from '../domain/entities/log.entity'

const logRepository = new LogRepositoryImpl(
  new FileSystemDatasource(),
  // new MongoLogDatasource(),
)

const emailService = new EmailService()

export class Server {
  static async start() {
    // new sendEmailLogs(emailService, logRepository).execute([
    //   'jhonmorales0089@gmail.com',
    // ])

    // emailService.sendEmail({
    //   to: 'jhonmorales0089@gmail.com',
    //   subject: 'logs del sistema',
    //   htmlBody: `
    //     <h1>Logs del sistema</h1>
    //     <p> lorem lorem  lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem </p>
    //     <p> ver los adjuntos </p>
    //   `,
    // })

    // CronService.cronJob('*/2 * * * * *', () => {
    //   const succes = (): void => {
    //     console.log('succes dependency check')
    //   }

    //   const error = (error: string): void => {
    //     console.log(error)
    //   }

    //   new CheckService(logRepository, succes, error).execute(
    //     'https://www.google.com',
    //   )
    // })

    // const logs = await logRepository.getLogs(LogSeverityLevel.low)
    // console.log('🚀 ~ file: Server.ts:49 ~ Server ~ start ~ logs:', logs)

    console.log('🐳 Starting server...')
  }
}
