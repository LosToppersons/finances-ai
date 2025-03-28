'use client';

import { Flex, Grid, Image } from '@chakra-ui/react';
import { SignUpStepsWithProvider } from './components/sign-up-steps';

export const Home = () => {
  return (
    <Grid
      templateColumns={{ base: '1fr', md: '2fr 1fr' }}
      gap={10}
      minHeight="70vh"
      mb={8}
    >
      <SignUpStepsWithProvider />

      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        borderRadius={8}
        gap={4}
        width="100%"
      >
        <Image src="/home-page-phone.jpg" alt="Phone Image" borderRadius={10} />
      </Flex>
    </Grid>
  );
};
