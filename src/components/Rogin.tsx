import { Box } from "@chakra-ui/react";
import { Auth } from "@supabase/ui";
import { client } from "../libs/supabase";
import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

export const Rogin: React.VFC = () => {
  const breakpoints = createBreakpoints({
    sm: "320px",
    md: "600px",
    lg: "960px",
    xl: "1200px",
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const theme = extendTheme({ breakpoints });

  return (
    <>
      <Box
        backgroundImage={{
          base: ".//mobileBackgroundImage.jpg",
          md: ".//webBackgroundImage.jpg",
        }}
        backgroundSize="cover"
      >
        <div className="flex justify-center flex-col h-screen">
          <h1 className="text-4xl text-center py-20 sm:text-6xl">
            みんなでわりかん。
          </h1>
          <div>
            <div className=" max-w-md m-auto">
              <Auth supabaseClient={client} providers={["google"]} />
            </div>
          </div>
        </div>
      </Box>
    </>
  );
};
