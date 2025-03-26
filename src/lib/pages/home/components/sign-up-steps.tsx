import { Button, Flex, Input, Text } from '@chakra-ui/react';
import { StepProvider, useStep } from '../context/sign-up-steps-context';

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
      <Flex gap={2} width="100%">
        {step === 0 && ( // Step 1: WhatsApp input
          <>
            <Input
              type="tel"
              variant="subtle"
              size="lg"
              placeholder="Número do WhatsApp 📲"
            />
            <Button colorScheme="blue" onClick={nextStep}>
              Continuar
            </Button>
          </>
        )}
        {step === 1 && ( // Step 2: Email input
          <>
            <Input
              type="email"
              variant="subtle"
              size="lg"
              placeholder="Digite seu email 📧"
            />
            <Button colorScheme="blue" onClick={nextStep}>
              Continuar
            </Button>
          </>
        )}
        {step === 2 && ( // Step 3: Verification code input
          <>
            <Input
              type="text"
              variant="subtle"
              size="lg"
              placeholder="Código de verificação"
            />
            <Button colorScheme="blue" onClick={nextStep}>
              Continuar
            </Button>
          </>
        )}
        {step === 3 && ( // Step 4: Final message or action
          <Text fontSize="large" textAlign="center">
            Obrigado! Você está pronto para começar.
          </Text>
        )}
      </Flex>
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
