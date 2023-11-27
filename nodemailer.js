const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'color6wrld@gmail.com',
    pass: 'ypyy vrwk xzaz ahsl',
  },
});

const mailOptions = {
  from: 'color6wrld@gmail.com',
  to: 'm.tshepo.ncube@gmail.com',
  subject: 'Subject of the Email',
  text: 'Body of the Email',
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.error(error);
  }
  console.log('Email sent: ' + info.response);
});
