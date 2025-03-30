import { Button, Input, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useStep } from '../context/sign-up-steps-context';

export function CodeValidationStep() {
  const { nextStep, setFormState } = useStep();

  const [name, setName] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

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
      <Text fontSize="medium" fontWeight="light" gridColumn="1 / -1">
        Enviamos um código de confirmação em seu email
      </Text>
      <Input
        type="number"
        variant="subtle"
        size="lg"
        onChange={(e) => setName(e.target.value)}
        placeholder="Código de confirmação"
        aria-invalid={error ? 'true' : 'false'}
        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
