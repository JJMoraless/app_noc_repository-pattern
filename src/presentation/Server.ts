import { CheckService } from '../domain/use-cases/checks/check-service'
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource'
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl'
import { CronService } from './cron/cron-service'

const fileSystemRepository = new LogRepositoryImpl(new FileSystemDatasource())

export class Server {
  static start(): void {
    const succes = (): void => {
      console.log('succes dependency check')
    }

    const error = (error: string): void => {
      console.log(error)
    }

    CronService.cronJob('*/2 * * * * *', () => {
      new CheckService(fileSystemRepository, succes, error).execute(
        'https://www.google.com',
      )
    })

    console.log('🐳 Starting server... TS')
  }
}
