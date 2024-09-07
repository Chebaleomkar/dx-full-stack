import nodemailer from 'nodemailer';

// Configure the email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "disciplinex.in@gmail.com",
    pass: "upyu kwes dnkh ajrv",
  },
});

// Function to send email
const sendEmail = async (to: string, subject: string, html: string) => {
  const mailOptions = {
    from: 'disciplinex.in@gmail.com',
    to,
    subject,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export default sendEmail;
