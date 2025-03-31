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
      phoneNumber: phoneNumber,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to send email');
  }
}
