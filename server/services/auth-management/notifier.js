const ejs = require('ejs');

module.exports = function(app) {

  function sendEmail(email) {
    return app.service('email').create(email).then(function (result) {
      console.log('Email sent', result)
    }).catch(err => {
      console.log('Error sending email', err)
    })
  };

  /**
   * notifier supports the following types:
   * 'resendVerifySignup' - Sent to verify new signup (from authManagement.resendVerifySignup API calls)
   * 'verifySignup' - Sent after new signup has been verified (from authManagement.verifySignupLong and authManagement.verifySignupShort API calls)
   * 'sendResetPwd' - Sent when password reset has been requested (from authManagement.resetPwdLong and authManagement.resetPwdShort API calls)
   * 'resetPwd' - Sent after password has been reset (from authManagement.resetPwdLong and authManagement.resetPwdShort API calls)
   * 'passwordChange' - Sent when user has changed password (from authManagement.passwordChange API calls)
   * 'identityChange' - Sent when user changes identity (i.e. email address) info (from authManagement.identityChange API calls)
   */
  return function(type, user, notifierOptions) {
    console.log(`-- Preparing email for ${type}`);
    console.log(user);
    let filename, data;
    switch (type) {
      case 'resendVerifySignup': // send an email with link for verifying user's email address
        filename = 'server/email-templates/verify.ejs';
        data = {
          user: user,
          verifyHref: `http://localhost:3030/verify?token=${user.verifyToken}`,
        };

        ejs.renderFile(filename, data, function(err, str) {
          // console.log('VERIFY EMAIL', err, str);

          email = {
            from: 'noreply@example.com',
            to: user.email,
            subject: 'Thanks for Registering',
            html: str,
         };

         return sendEmail(email);
        });

        break;
      case 'sendResetPwd': // send an email with link for resetting user's password
        filename = 'server/email-templates/reset-password.ejs';
        data = {
          user: user,
          verifyHref: `http://localhost:3030/reset-password?token=${user.resetToken}`,
        };

        ejs.renderFile(filename, data, function(err, str) {
          // console.log('VERIFY EMAIL', err, str);

          email = {
            from: 'noreply@example.com',
            to: user.email,
            subject: 'Password reset request received',
            html: str,
         };

         return sendEmail(email);
        });

        break;
      case 'passwordChange': // send an email with link for resetting user's password
        filename = 'server/email-templates/password-changed.ejs';
        data = {
          user: user,
          verifyHref: `http://localhost:3030/reset-password?token=${user.resetToken}`,
        };

        ejs.renderFile(filename, data, function(err, str) {
          // console.log('VERIFY EMAIL', err, str);

          email = {
            from: 'noreply@example.com',
            to: user.email,
            subject: 'Password changed',
            html: str,
         };

         return sendEmail(email);
        });

        break;
      default:
        break;
    }
  };
};