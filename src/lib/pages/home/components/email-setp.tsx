import { Button, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { useStep } from '../context/sign-up-steps-context';

export function EmailStep() {
  const { nextStep, setFormState } = useStep();

  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  async function handleNextStep() {
    const isValid =
      email?.length > 5 || email.includes('@') || email.includes('.');

    if (isValid) {
      setError(false);
      setFormState((prev) => ({ ...prev, email }));

      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
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
