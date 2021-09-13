// After: _app.tsx
import "tailwindcss/tailwind.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";

const MyApp = (props: AppProps) => {
  return (
    <ChakraProvider>
      <props.Component {...props.pageProps} />
    </ChakraProvider>
  );
};

export default MyApp;
