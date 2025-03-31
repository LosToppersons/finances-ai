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
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, // Corrigido para SMTP_HOST
    port: 587,
    secure: false, // true para 465, false para 587 ou 25
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD, // Aqui vai o token/senha
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_EMAIL_USER,
    to,
    subject,
    text,
  });
};
