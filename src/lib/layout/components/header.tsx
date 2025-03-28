import { Box, Flex, Heading } from '@chakra-ui/react';

import { ColorModeButton } from '@/components/ui/color-mode';

export const Header = () => {
  return (
    <Flex as="header" width="full" align="center">
      <Heading as="h1" size="lg">
        Finanças-IA
      </Heading>{' '}
      <Box marginLeft="auto">
        <ColorModeButton />
      </Box>
    </Flex>
  );
};
