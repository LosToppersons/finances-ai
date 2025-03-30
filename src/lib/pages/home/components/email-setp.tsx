import { Button, Input } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useStep } from '../context/sign-up-steps-context';

export function EmailStep() {
  const { nextStep, setFormState, formState } = useStep();

  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setEmail(formState.email);
  }, [formState.email]);

  async function handleNextStep() {
    const isValid =
      email?.length > 5 || email.includes('@') || email.includes('.');

    if (isValid) {
      setError(false);
      setFormState((prev) => ({ ...prev, email }));

      setLoading(true);
      const response = await fetch('/api/sign-up/email-confirmation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          name: formState.name,
          phoneNumber: formState.phoneNumber,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }
      setLoading(false);

      nextStep();
      return;
    }

    setError(true);
  }

  return (
    <>
      <Input
        type="tel"
        variant="subtle"
        size="lg"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder="Digite seu email 📧"
        aria-invalid={error ? 'true' : 'false'}
      />
      <Button
        colorScheme="blue"
        onClick={handleNextStep}
        height="100%"
        loading={loading}
      >
        Continuar
      </Button>
    </>
  );
}
