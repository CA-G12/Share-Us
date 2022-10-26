
import mail from '@sendgrid/mail'
import config from '../config/environment'

mail.setApiKey(config.shareus || '')

const sendEmail = async (to:string, subject:string, text:string) => {
  const message = {
    to,
    from: 'dbakeza2002@hotmail.com',
    subject,
    text
  }
  try {
    return await mail.send(message)
  } catch (error) {
    console.log('error', error)
  }
}
export default sendEmail
