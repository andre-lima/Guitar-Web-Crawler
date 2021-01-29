
const ProtonMail = require('protonmail-api');

async function sendEmail(subject, content) {
  const pm = await ProtonMail.connect({
    username: 'andredantaslima@protonmail.com',
    password: 'Aa9c!6N7sFjngE'
  })

  await pm.sendEmail({
    to: 'andre.dantas.lima@gmail.com',
    subject: subject,
    body: content
  })

  pm.close()
}

module.exports = { sendEmail }