import { CheckService } from '../domain/use-cases/checks/check-service'
import { CronService } from './cron/cron-service'

const succes = (): void => {
  console.log('succes dependency check')
}

const error = (error: string): void => {
  console.log(error)
}

export class Server {
  static start(): void {
    CronService.cronJob('*/4 * * * * *', () => {
      new CheckService(succes, error).execute('https://www.google.com')
    })

    console.log('🐳 Starting server... TS')
  }
}
