// After: _app.tsx
import "tailwindcss/tailwind.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Auth } from "@supabase/ui";
import { client } from "src/libs/supabase";

const MyApp = (props: AppProps) => {
  return (
    <Auth.UserContextProvider supabaseClient={client}>
      <ChakraProvider>
        <props.Component {...props.pageProps} />
      </ChakraProvider>
    </Auth.UserContextProvider>
  );
};

export default MyApp;
