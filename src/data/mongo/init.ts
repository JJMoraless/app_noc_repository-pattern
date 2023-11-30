import mongoose from 'mongoose'

interface ConectionOptions {
  mongoUrl: string
  dbName: string
}

export class MongoDatabase {
  static async connect(options: ConectionOptions) {
    const { dbName, mongoUrl } = options
    try {
      await mongoose.connect(mongoUrl, {
        dbName,
      })
      console.log('Mongo conection success 🦭 ')
    } catch (error) {
      console.log('Mongo conection error  ☢️')
      throw error
    }
  }
}
