import { Box } from "@chakra-ui/react";
import { Auth } from "@supabase/ui";
import { client } from "src/libs/supabase";
import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

export const Top: React.VFC = () => {
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
        <div className="h-screen">
          <div className="flex justify-center flex-col ">
              <h1 className="text-4xl text-center py-32 sm:text-6xl">みんなでわりかん。</h1>
            <div>
              <div className=" max-w-md m-auto p-8">
                <Auth
                  supabaseClient={client}
                  socialColors={true}
                />
              </div>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
};
