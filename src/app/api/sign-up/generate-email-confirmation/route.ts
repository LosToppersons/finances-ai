import { sendEmail } from '@/lib/helper/email-helper';
import { getCollections } from '@/lib/db/mongo-db';

export async function POST(request: Request) {
  const { email, name, phoneNumber } = (await request.json()) as {
    email: string;
    name: string;
    phoneNumber: string;
  };

  if (!email /*|| !name */ || !phoneNumber) {
    return new Response('Missing parameters', {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const confirmationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const { usersCollection } = await getCollections();

    await usersCollection.updateOne(
      { email: email.trim(), phoneNumber },
      {
        $set: {
          creationTimestamp: Date.now(),
          emailVerified: false,
          emailConfirmation: {
            code: confirmationCode,
            expiresAt: Date.now() + 30 * 60 * 1000, // 30 minutes in ms
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
