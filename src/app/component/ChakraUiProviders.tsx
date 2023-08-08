"use client";

import React from 'react'
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';

interface Props {
    children?: React.ReactNode;
  }

const ChakraUiProviders = ({ children }: Props) => {
  return (
    <CacheProvider>
    <ChakraProvider>
        {children}
    </ChakraProvider>
    </CacheProvider>

  )
}

export default ChakraUiProviders