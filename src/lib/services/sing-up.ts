export async function generateEmailConfirmation({
  email,
  name,
  phoneNumber,
}: {
  email: string;
  name: string;
  phoneNumber: string;
}) {
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
    throw new Error('Failed to send email');
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
  console.log('response - code response validation', response);
  const data = await response.text();
  console.log('data - code response validation', data);

  if (!response.ok) {
    throw new Error('Failed to validate code');
  }

  return data;
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
