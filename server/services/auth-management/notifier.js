const ejs = require('ejs');

module.exports = function(app) {

  function sendEmail(email) {
    return app.service('email').create(email).then(function (result) {
      console.log('Email sent', result)
    }).catch(err => {
      console.log('Error sending email', err)
    })
  };

  return function(type, user, notifierOptions) {
    console.log(`-- Preparing email for ${type}`)

    switch (type) {
      case 'resendVerifySignup': // send an email with link for verifying user's email address
        let filename = 'server/email-templates/verify.ejs';
        let data = {
          user: user,
          verifyHref: `http://localhost:3030/verify?token=${user.verifyToken}`,
        };

        ejs.renderFile(filename, data, function(err, str) {
          // console.log('VERIFY EMAIL', err, str);

          email = {
            from: 'noreply@example.com',
            to: user.email,
            subject: 'Thanks for Registering',
            html: str
         };

         return sendEmail(email);
        });

        break
      default:
        break
    }
  };
};