import { Box, HStack, Heading, Stack, VStack } from '@chakra-ui/react';
import React from 'react';
import {
  TiSocialInstagramCircular,
  TiSocialLinkedinCircular,
} from 'react-icons/ti';
import { DiGithub } from 'react-icons/di';
const Footer = () => {
  return (
    <Box padding={'4'} bg={'blackAlpha.900'} minW={"100%"}>
      <Stack direction={['column', 'row']}>
        <VStack alignItems={['center', 'flex-start']} width={'full'}>
          <Heading children="All Rights Reserved" color={'white'} />
          <Heading
            size={'sm'}
            fontFamily={'body'}
            children="@Adii"
            color={'yellow.400'}
          />
        </VStack>

        <HStack spacing={['2', '10']} justifyContent="center"
        color={"white"}
        fontSize={50}>
            <a href="https://www.linkedin.com/in/aditya-ningule/" target={'blank'}>
            <TiSocialLinkedinCircular />
            </a>
            <a href="https://instagram.com/a_diitz" target={'blank'}>
            <TiSocialInstagramCircular />
            </a>
            <a href="https://github.com/Adii2202" target={'blank'}>
            <DiGithub />
            </a>
        </HStack>
        
      </Stack>
    </Box>
  );
};

export default Footer;
