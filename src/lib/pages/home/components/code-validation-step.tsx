import { generateEmailConfirmation } from '@/lib/services/sing-up';
import { Button, Flex, Input, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useStep } from '../context/sign-up-steps-context';

export function CodeValidationStep() {
  const { nextStep, formState, setFormState } = useStep();

  const [name, setName] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingResend, setLoadingResend] = useState<boolean>(false);
  const [canResend, setCanResend] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const emailSentAt = localStorage.getItem('emailConfirmationSentAt');
    if (emailSentAt) {
      const timePassed = Date.now() - parseInt(emailSentAt);
      const remaining = Math.max(30_000 - timePassed, 0);

      if (remaining > 0) {
        setCanResend(false);
        setTimeLeft(Math.ceil(remaining / 1000));

        const interval = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              setCanResend(true);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        return () => clearInterval(interval);
      }
    }
    setCanResend(true);
  }, []);

  async function handleNextStep() {
    if (name.length >= 3) {
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

  async function handleResendCode() {
    if (!canResend) return;

    setLoadingResend(true);

    await generateEmailConfirmation({
      email: formState.email,
      name: formState.name,
      phoneNumber: formState.phoneNumber,
    });

    localStorage.setItem('emailConfirmationSentAt', Date.now().toString());
    setCanResend(false);
    setLoadingResend(false);
    setTimeLeft(30);

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
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
        disabled={loadingResend}
      >
        Continuar
      </Button>
      <Flex
        gridColumn="1 / -1"
        mt={4}
        gap={2}
        alignItems="center"
        justifyContent="center"
      >
        <Text
          fontSize="small"
          fontWeight="light"
          color="gray.500"
          textAlign="center"
        >
          {canResend
            ? 'Não recebeu o código?'
            : `Aguarde ${timeLeft} segundos para reenviar o código`}
        </Text>
        <Button
          variant="outline"
          colorScheme="blue"
          size="xs"
          loading={loadingResend}
          onClick={handleResendCode}
          disabled={!canResend}
        >
          Reenviar
        </Button>
      </Flex>
    </>
  );
}
