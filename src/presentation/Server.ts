
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource'
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl'
import { EmailService } from './email/email.service'

import { sendEmailLogs } from '../domain/use-cases/email/send-email-logs'

const fileSystemRepository = new LogRepositoryImpl(new FileSystemDatasource())
const emailService = new EmailService()

export class Server {
  static start(): void {
    new sendEmailLogs(emailService, fileSystemRepository).execute([
      'jhonmorales0089@gmail.com',
    ])

    // emailService.sendEmail({
    //   to: 'jhonmorales0089@gmail.com',
    //   subject: 'logs del sistema',
    //   htmlBody: `
    //     <h1>Logs del sistema</h1>
    //     <p> lorem lorem  lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem </p>
    //     <p> ver los adjuntos </p>
    //   `,
    // })

    const succes = (): void => {
      console.log('succes dependency check')
    }

    const error = (error: string): void => {
      console.log(error)
    }

    // CronService.cronJob('*/2 * * * * *', () => {
    //   new CheckService(fileSystemRepository, succes, error).execute(
    //     'https://www.google.com',
    //   )
    // })

    console.log('🐳 Starting server... TS')
  }
}
