import { sendEmail } from '@/lib/helper/email-helper';
import { getCollections } from '@/lib/db/mongo-db';

export async function POST(request: Request) {
  const { email, name, phoneNumber } = (await request.json()) as {
    email: string;
    name: string;
    phoneNumber: string;
  };

  try {
    const confirmationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const formattedNumber =
      '55' +
      phoneNumber
        .replace('(', '')
        .replace(')', '')
        .replace('-', '')
        .replaceAll(' ', '')
        .replace('9', '');

    const { usersCollection } = await getCollections();
    await usersCollection.updateOne(
      { email: email.trim(), phoneNumber: formattedNumber },
      {
        $set: {
          emailConfirmation: {
            confirmationCode,
            confirmationExpires: Date.now() + 15 * 60 * 1000, // 15 minutes in ms
          },
        },
      },
      { upsert: true }
    );

    await sendEmail({
      to: email,
      subject: 'Código de confirmação Finanças-IA',
      text: `Olá ${name}!\n
Seu código de confirmação é: ${confirmationCode}`,
    });

    return new Response('Confirmation code sent', {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response('Error sending confirmation code', {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
