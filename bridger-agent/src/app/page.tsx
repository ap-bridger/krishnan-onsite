"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@/client/graphql/apollo-client";
import { TransactionTable } from "@/components/TransactionTable/TransactionTable";

const theme = extendTheme({
  colors: {
    brand: {
      blue: "#3B82F6",
      grey: "#E5E7EB",
      lightGrey: "#F3F4F6",
      darkGrey: "#6B7280",
      white: "#FFFFFF",
    },
  },
  fontSizes: {
    sm: "14px",
    md: "16px",
  },
});

export default function Home() {
  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider theme={theme}>
        <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto' }}>
          <TransactionTable />
        </div>
      </ChakraProvider>
    </ApolloProvider>
  );
}
