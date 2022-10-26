
import mail from '@sendgrid/mail'
import config from '../config/environment'

mail.setApiKey(config.SENDGRID_API_KEY)

const sendEmail = async (to:string, subject:string, text:string) => {
  const message = {
    to,
    from: config.SENDGRID_EMAIL,
    subject,
    text
  }
  return mail.send(message)
}
export default sendEmail
