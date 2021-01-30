const { sendEmail } = require('./email');

async function emailController(finalResult) {
  const isAnyAvailable = finalResult.some(result => result.isAvailable)

  // Email formatting
  const emailSubject = `Is J Mascis available? ${isAnyAvailable ? 'YES!' : 'no...'}`

  const emailBody = `<h1>Does someone have it: ${isAnyAvailable ? 'YES!' : 'no...'} </h1>
    <div>
    <h2>Summary:</h2>
    ${(finalResult.map(r => `<p>${r.store} /// <strong>${r.isAvailable ? 'YES' : 'no'}</strong> /// ${r.title}</p>`)).join('\n')}
    </div>`;

  // Should send email?
  if (isAnyAvailable || new Date().getHours() === 9 || new Date().getHours() === 17) {
    await sendEmail(emailSubject, emailBody);
    console.log('Email sent!');
  } else {
    console.log('Email not sent!');
  }
}

module.exports = { emailController };