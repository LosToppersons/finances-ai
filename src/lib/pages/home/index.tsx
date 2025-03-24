import { Flex, Text } from '@chakra-ui/react';

export const Home = () => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      minHeight="70vh"
      gap={4}
      mb={8}
      w="full"
    >
      <Text fontSize="xxx-large">Isto é Finances-AI</Text>
    </Flex>
  );
};
