import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/envs.plugin'

interface SendEmailOptions {
  to: string | string[]
  subject: string
  htmlBody: string
  attachments?: Attachement[]
}

interface Attachement {
  filename: string
  path: string
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  })

  constructor() {}

  async sendEmail(options: SendEmailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options
    try {
      const sendInformation = await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments,
      })

      return true
    } catch (error) {
      return false
    }
  }

  async sendEmailWIthFileSystemLogs(to: string | string[]): Promise<boolean> {
    const subject = 'logs del sistema'
    const htmlBody = `
      <h1>Logs del sistema</h1>
      <p> lorem lorem  lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem </p>
      <p> ver los adjuntos </p>
    `
    const attachments: Attachement[] = [
      { filename: 'logs-low.log', path: 'logs/logs-low.log' },
      { filename: 'logs-medium.log', path: 'logs/logs-high.log' },
      { filename: 'logs-high.log', path: 'logs/logs-medium.log' },
    ]
    return this.sendEmail({ to, subject, htmlBody, attachments })
  }
}
