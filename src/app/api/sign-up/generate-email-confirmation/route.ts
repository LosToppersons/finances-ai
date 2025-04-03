import { coreApiFetch } from '@/lib/helper/apiHelper';

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

  const response = await coreApiFetch('/signUp/generateEmailCode', {
    body: JSON.stringify({
      email: email.trim(),
      name,
      phoneNumber,
    }),
    method: 'POST',
  });

  if (!response.ok) {
    const jsonError = (await response.json()) as {
      error: string;
    };

    return new Response(jsonError.error, {
      status: response.status,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response('Confirmation code successfully sent!', {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
