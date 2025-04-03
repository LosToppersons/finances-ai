import { toaster } from '@/components/ui/toaster';
import {
  generateEmailConfirmation,
  validateCode,
} from '@/lib/services/sing-up';
import { Button, Checkbox, Flex, Input, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useStep } from '../context/sign-up-steps-context';

const TIME_TO_RESEND = 30_000; // 2 minutos

export function CodeValidationStep() {
  const { nextStep, formState } = useStep();

  const [code, setCode] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [termsError, setTermsError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingResend, setLoadingResend] = useState<boolean>(false);
  const [canResend, setCanResend] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);

  useEffect(() => {
    const emailSentAt = localStorage.getItem('emailConfirmationSentAt');
    if (emailSentAt) {
      const timePassed = Date.now() - parseInt(emailSentAt);
      const remaining = Math.max(TIME_TO_RESEND - timePassed, 0);

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
    if (code.length !== 6) {
      setError(true);
      return;
    }

    if (!termsAccepted) {
      setTermsError(true);
      toaster.create({
        title: 'É necessário aceitar os termos e condições para prosseguir',
      });
      return;
    }

    setTermsError(false);
    setError(false);
    setLoading(true);

    const validateCodePromise = validateCode({
      code,
      email: formState.email,
      phoneNumber: formState.phoneNumber,
    });

    toaster.promise(validateCodePromise, {
      success: {
        title: 'Sucesso!',
        description: 'Seu email foi confirmado! Seja bem-vindo ao Finaças-IA!.',
      },
      error: {
        title: 'Falha ao validar código',
        description: 'Verifique se o código está correto e tente novamente.',
      },
      loading: {
        title: 'Validando...',
        description: 'Estamos confirmando seu código',
      },
    });

    validateCodePromise
      .then(() => {
        setLoading(false);
        nextStep();
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }

  async function handleResendCode() {
    if (!canResend) return;

    setLoadingResend(true);

    setTermsError(false);
    setError(false);
    setLoadingResend(true);

    const emailCodePromise = generateEmailConfirmation({
      email: formState.email.trim(),
      name: formState.name.trim(),
      phoneNumber: formState.phoneNumber.trim(),
    });

    toaster.promise(emailCodePromise, {
      success: {
        title: 'Sucesso!',
        description:
          'O email de confirmação foi enviado. Verifique sua caixa de spam!',
      },
      error: {
        title: 'Falha ao enviar email',
        description: 'Verifique se os dados estão corretos e tente novamente.',
      },
      loading: {
        title: 'Enviando...',
        description: 'Seu email de confirmação está sendo enviado',
      },
    });

    emailCodePromise
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      })
      .finally(() => {
        setTimeLeft(TIME_TO_RESEND);
        setLoadingResend(false);
        localStorage.setItem('emailConfirmationSentAt', Date.now().toString());
      });

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
        onChange={(e) => setCode(e.target.value)}
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
      <Flex
        gridColumn="1 / -1"
        mt={4}
        gap={2}
        alignItems="start"
        justifyContent="start"
      >
        <Checkbox.Root
          checked={termsAccepted}
          onCheckedChange={(e) => setTermsAccepted(!!e.checked)}
          invalid={termsError}
          color={termsError ? 'red.500' : ''}
        >
          <Checkbox.HiddenInput />
          <Checkbox.Control />
          <Checkbox.Label>
            Li e concordo com todos os termos e condições.
          </Checkbox.Label>
        </Checkbox.Root>
      </Flex>
    </>
  );
}
