import { PrismaClient } from '@prisma/client'
import { envs } from './config/plugins/envs.plugin'
import { MongoDatabase } from './data/mongo'

import { Server } from './presentation/Server'

// main execution
;(async () => {
  main()
})()

async function main() {
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  })

  const db = new PrismaClient()

  // const newLog = await db.logModel.create({
  //   data: {
  //     level: 'HIGHT',
  //     message: 'test message log',
  //     origin: 'app ts',
  //   },
  // })

  // console.log({ newLog })

  const logs = await db.logModel.findMany({
    where: {
      level: 'HIGHT',
    },
  })

  console.log(logs)

  // const newLog = await LogModel.create({
  //   level: 'low',
  //   origin: 'app.ts',
  //   message: 'test messaje',
  // })

  // await newLog.save()

  // const logs = await LogModel.find()
  // console.log('🚀 ~ file: app.ts:26 ~ main ~ logs:', logs)

  Server.start()
}
