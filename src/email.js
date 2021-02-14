const sgMail = require('@sendgrid/mail');

async function sendEmail(subject, content) {
  // Key no longer valid. Get a new one on SendGrid
  sgMail.setApiKey('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')

  const msg = {
    name: 'MASCIS',
    to: 'andre.dantas.lima@gmail.com', // Change to your recipient
    from: 'andredantaslima@protonmail.com', // Change to your verified sender
    subject: subject,
    html: content,
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body)
    }
  }
}

module.exports = { sendEmail }
