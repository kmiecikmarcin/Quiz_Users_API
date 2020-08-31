const nodemailer = require('nodemailer');
const generator = require('generate-password');
const bcrypt = require('bcrypt');

async function sendEmailToUserWithPassword(Users, userEmail) {
  const checkEmail = await Users.findOne({ where: { email: userEmail } });
  if (checkEmail !== null) {
    const newPasswordForUser = generator.generate({
      length: 10,
      numbers: true,
    });
    if (newPasswordForUser !== null) {
      const hash = await bcrypt.hash(newPasswordForUser, 8);
      const changePassword = await Users.update({
        password: hash,
      }, {
        where: { email: userEmail },
      });
      if (changePassword !== null) {
        const transporter = nodemailer.createTransport({
          service: process.env.S3_AUTOMATIC_SERVICE_NAME,
          secure: true,
          auth: {
            type: process.env.S3_AUTOMATIC_TYPE,
            clientId: process.env.S3_AUTOMATIC_CLIENTID,
            clientSecret: process.env.S3_AUTOMATIC_CLIENTSECRET,
            user: process.env.S3_AUTOMATIC_EMAIL_ADRESS,
            pass: process.env.S3_AUTOMATIC_EMAIL_PASSWORD,
            refreshToken: process.env.S3_AUTOMATIC_REFRESHTOKEN,
          },
        });
        const mailOptions = {
          from: '"Quiz - Technikum kretywne" <automatic.quiz.api@gmail.com>',
          to: userEmail,
          subject: 'Zapytanie o przypomnienie hasła',
          html: `
            <body>
            <h4>Witaj ${checkEmail.email}!</h4>
            <p>Dostaliśmy zapytanie o przypomnienie hasła do twojego konta w aplikacji Quiz. W odpowiedzi na twoje zapytanie wysłaliśmy hasło.</p>
            <p>Hasło: ${newPasswordForUser}</p>
            <p>To jest automatyczna wiadomość, nie odpowiadaj na nią!</p>
            </body>`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return error;
          }
          return info;
        });
        const response = true;
        return response;
      }
      return null;
    }
    return null;
  }
  return null;
}

module.exports = sendEmailToUserWithPassword;
