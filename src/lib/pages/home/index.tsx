'use client';

import { Flex, Grid, Text } from '@chakra-ui/react';
import { SignUpStepsWithProvider } from './components/sign-up-steps';

export const Home = () => {
  return (
    <Grid templateColumns="2fr 1fr" gap={10} minHeight="70vh" mb={8}>
      <SignUpStepsWithProvider />

      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        borderRadius={8}
        gap={4}
        bg="#cce6ff"
      >
        <Text fontSize="xxx-large">Imagem do celular</Text>
      </Flex>
    </Grid>
  );
};
// 📲📱
