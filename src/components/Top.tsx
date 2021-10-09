import { Auth } from "@supabase/ui";
import { useEffect } from "react";
import { client } from "src/libs/supabase";

export const Top = () => {
  useEffect(() => {
    document.body.style.backgroundImage = "url(.//webBackgroundImage.jpg)";
    document.body.style.backgroundSize = "cover";
  }, []);

  return (
    <>
      <h1 className="text-6xl text-center pt-40 ">みんなでわりかん。</h1>
      <div className="flex justify-center pt-24">
        <div className="sm:w-96">
          <Auth
            supabaseClient={client}
            providers={["github"]}
            socialColors={true}
          />
        </div>
      </div>
    </>
  );
};
