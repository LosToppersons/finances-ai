import nodemailer from 'nodemailer';

export const sendEmail = async ({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) => {
  try {
    console.log({
      'process.env.SMTP_HOST': process.env.SMTP_HOST,
      'process.env.SMTP_EMAIL_USER': process.env.SMTP_EMAIL_USER,
      'process.env.SMTP_EMAIL_PASSWORD': process.env.SMTP_EMAIL_PASSWORD,
    });
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // Corrigido para SMTP_HOST
      port: 587,
      secure: false, // true para 465, false para 587 ou 25
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD, // Aqui vai o token/senha
      },
    });

    const response = await transporter.sendMail({
      from: process.env.SMTP_EMAIL_USER,
      to,
      subject,
      text,
    });
    console.log('Email response', response);
  } catch (e) {
    console.error('Error sending email:', e);
  }
};
