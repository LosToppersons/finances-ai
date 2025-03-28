import { Button, Flex, Grid, Input, Text } from '@chakra-ui/react';
import { StepProvider, useStep } from '../context/sign-up-steps-context';
import { EmailStep } from './email-setp';
import { PhoneNumberStep } from './phone-number-step';

export function SignUpSteps() {
  const { step, nextStep } = useStep();

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      gap={4}
      width="100%"
    >
      <Text as="h1" fontSize="xxx-large" fontWeight="bold">
        Suas finanças, sempre acessíveis na palma da sua mão! 📱
      </Text>
      <Text fontSize="large" textAlign="center">
        Receba análises personalizadas para controle dos gastos
      </Text>
      <Grid templateColumns="2fr 1fr" gap={2} width="100%">
        {step === 0 && ( // Step 1: WhatsApp input
          <PhoneNumberStep />
        )}
        {step === 1 && ( // Step 2: Email input
          <EmailStep />
        )}
        {step === 2 && ( // Step 3: Verification code input
          <>
            <Input
              type="text"
              variant="subtle"
              size="lg"
              width="100%"
              placeholder="Código de verificação"
            />
            <Button
              colorScheme="blue"
              onClick={() => {
                nextStep();
              }}
              height="100%"
              type="submit"
            >
              Continuar
            </Button>
          </>
        )}
        {step === 3 && ( // Step 4: Final message or action
          <Text gridColumn="1 / -1" textAlign="center" fontSize="large">
            Obrigado! Você está pronto para começar.
          </Text>
        )}
      </Grid>
    </Flex>
  );
}

export function SignUpStepsWithProvider() {
  return (
    <StepProvider>
      <SignUpSteps />
    </StepProvider>
  );
}
