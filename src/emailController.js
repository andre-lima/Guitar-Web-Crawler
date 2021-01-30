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

  const currentHour = new Date().getHours();

  // Should send email?
  if (isAnyAvailable || currentHour === 9 || currentHour === 17) {
    await sendEmail(emailSubject, emailBody);
    console.log('Email sent!');
  } else {
    console.log('Email not sent!');
  }
}

module.exports = { emailController };