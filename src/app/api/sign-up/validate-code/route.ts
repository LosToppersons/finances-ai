import { coreApiFetch } from '@/lib/helper/apiHelper';

export async function POST(request: Request) {
  const { code, email, phoneNumber } = (await request.json()) as {
    code: string;
    email: string;
    phoneNumber: string;
  };

  if (!code || !email || !phoneNumber) {
    return new Response('Missing parameters', {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const response = await coreApiFetch('/signUp/confirmEmailCode', {
    body: JSON.stringify({
      code: code.trim(),
      email: email.trim(),
      phoneNumber: phoneNumber.trim(),
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

  return new Response('Success! Code matches.', {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
