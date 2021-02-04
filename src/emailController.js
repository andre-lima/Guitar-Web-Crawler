const { sendEmail } = require('./email');

async function emailController(finalResult) {
  const isAnyAvailable = finalResult.some(result => result.isAvailable)

  // Email formatting
  let emailSubject = `Is J Mascis available? ${isAnyAvailable ? 'YES!' : 'no...'}`

  let emailBody = `<h1>Does someone have it: ${isAnyAvailable ? 'YES!' : 'no...'} </h1>
    <div>
    <h2>Summary:</h2>
    ${(finalResult.map(r => `<p>${r.store} /// <strong>${r.isAvailable ? 'YES' : 'no'}</strong> /// ${r.comment} /// ${r.title}</p>`)).join('\n')}
    </div>`;

  if (finalResult.length === 0) {
    emailSubject = 'No response from pages!';
    emailBody = 'No response from pages!';
  }

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