import { Button, Input } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useStep } from '../context/sign-up-steps-context';
import { generateEmailConfirmation } from '@/lib/services/sing-up';

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
      setFormState((prev) => ({ ...prev, email: email.trim() }));

      setLoading(true);

      await generateEmailConfirmation({
        email: email.trim(),
        name: formState.name,
        phoneNumber: formState.phoneNumber,
      });

      localStorage.setItem('emailConfirmationSentAt', Date.now().toString());

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
