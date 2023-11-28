import { CronJob } from 'cron'
/**
 * in clean code when you have more than 2 arguments, you can use objects
 */
type CromTime = string | Date
type OnTick = () => void

export class CronService {
  static cronJob(cronTime: CromTime, onTick: OnTick): CronJob {
    const job = new CronJob(cronTime, onTick)
    job.start()
    return job
  }
}
