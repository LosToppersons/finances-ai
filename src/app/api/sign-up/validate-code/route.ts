import { getCollections } from '@/lib/db/mongo-db';

export async function POST(request: Request) {
  const { code, email, phoneNumber } = (await request.json()) as {
    code: string;
    email: string;
    phoneNumber: string;
  };
  console.log({ code, email, phoneNumber });
  try {
    const { usersCollection } = await getCollections();

    if (!code || !email || !phoneNumber) {
      return new Response('Missing parameters', {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const user = await usersCollection.findOne({
      email,
      phoneNumber,
      emailConfirmation: { $exists: true },
    });
    console.log(
      { user },
      {
        email,
        phoneNumber,
        emailConfirmation: { $exists: true },
      }
    );
    if (!user) {
      return new Response('User not found', {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (user?.emailConfirmation?.code !== code) {
      return new Response('Invalid code', {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (user.emailConfirmation.expiresAt < Date.now()) {
      return new Response('Code expired', {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await usersCollection.updateOne(
      { email, phoneNumber },
      { $set: { emailVerified: true }, $unset: { emailConfirmation: '' } }
    );

    return new Response('Code matches', {
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
