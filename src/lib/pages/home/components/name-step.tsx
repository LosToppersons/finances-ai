import { Button, Input } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useStep } from '../context/sign-up-steps-context';

export function NameStep() {
  const { nextStep, setFormState, formState } = useStep();

  const [name, setName] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setName(formState.name);
  }, [formState.name]);

  async function handleNextStep() {
    const isValid = name.length >= 3;

    if (isValid) {
      setError(false);
      setFormState((prev) => ({ ...prev, name }));

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
        type="text"
        variant="subtle"
        size="lg"
        onChange={(e) => setName(e.target.value)}
        value={name}
        placeholder="Qual seu nome?"
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
