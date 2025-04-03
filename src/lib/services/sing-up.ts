export async function generateEmailConfirmation({
  email,
  name,
  phoneNumber,
}: {
  email: string;
  name: string;
  phoneNumber: string;
}): Promise<void> {
  const response = await fetch('/api/sign-up/generate-email-confirmation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      name: name,
      phoneNumber: formattedNumber(phoneNumber),
    }),
  });

  if (!response.ok) {
    const errorJson = (await response.json()) as {
      error: string;
    };

    console.error('Error generating email confirmation:', errorJson.error);
    throw new Error(errorJson.error);
  }
}

export async function validateCode({
  code,
  email,
  phoneNumber,
}: {
  code: string;
  email: string;
  phoneNumber: string;
}) {
  const response = await fetch('/api/sign-up/validate-code', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code,
      email,
      phoneNumber: formattedNumber(phoneNumber),
    }),
  });

  if (!response.ok) {
    const errorJson = (await response.json()) as {
      error: string;
    };

    console.error('Error confirming code:', errorJson.error);
    throw new Error(errorJson.error);
  }
}

const formattedNumber = (phoneNumber: string) => {
  return (
    '55' +
    phoneNumber
      .replace('(', '')
      .replace(')', '')
      .replace('-', '')
      .replaceAll(' ', '')
      .replace('9', '')
      .trim()
  );
};
