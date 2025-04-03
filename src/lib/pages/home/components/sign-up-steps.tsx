import { Flex, Grid, Text } from '@chakra-ui/react';
import { LuCircleArrowLeft } from 'react-icons/lu';
import { StepProvider, useStep } from '../context/sign-up-steps-context';
import { CodeValidationStep } from './code-validation-step';
import { EmailStep } from './email-setp';
import { NameStep } from './name-step';
import { PhoneNumberStep } from './phone-number-step';

export function SignUpSteps() {
  const { step, prevStep } = useStep();

  function handleBackStep() {
    if (step > 0 && step < 4) {
      prevStep();
    }
  }

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
      <Grid templateColumns="2fr 1fr" gap={2} width="100%" mt={30}>
        {step === 0 && <NameStep />}
        {step === 1 && <PhoneNumberStep />}
        {step === 2 && <EmailStep />}
        {step === 3 && <CodeValidationStep />}
        {step === 4 && (
          <Text gridColumn="1 / -1" textAlign="center" fontSize="x-large">
            Obrigado! Você está pronto para começar.
          </Text>
        )}
      </Grid>
      <Flex alignSelf="self-end">
        <LuCircleArrowLeft
          size={20}
          style={{
            cursor: 'pointer',
          }}
          onClick={handleBackStep}
        />
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
