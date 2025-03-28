import { Button, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { withMask } from 'use-mask-input';
import { useStep } from '../context/sign-up-steps-context';

export function PhoneNumberStep() {
  const { nextStep, setFormState } = useStep();

  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  async function handleNextStep() {
    const isValid = phoneNumber?.length === 15 && !phoneNumber.includes('_');

    if (isValid) {
      setError(false);
      setFormState((prev) => ({ ...prev, phoneNumber }));

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
        ref={withMask('(99) 99999-9999')}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Número do WhatsApp 📲"
        aria-invalid={error ? 'true' : 'false'}
      />
      <Button
        colorScheme="blue"
        height="100%"
        loading={loading}
        onClick={handleNextStep}
      >
        Continuar
      </Button>
    </>
  );
}
