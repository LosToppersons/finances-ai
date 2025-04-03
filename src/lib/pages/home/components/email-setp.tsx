import { toaster } from '@/components/ui/toaster';
import { generateEmailConfirmation } from '@/lib/services/sing-up';
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
      email?.length > 5 && email.includes('@') && email.includes('.');

    if (!isValid) {
      setError(true);
      return;
    }

    setLoading(true);
    setError(false);
    setFormState((prev) => ({ ...prev, email: email.trim() }));

    const emailCodePromise = generateEmailConfirmation({
      email: email.trim(),
      name: formState.name,
      phoneNumber: formState.phoneNumber,
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
        localStorage.setItem('emailConfirmationSentAt', Date.now().toString());
        setLoading(false);
        nextStep();
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
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
