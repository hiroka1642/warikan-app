import { Auth } from "@supabase/ui";
import { client } from "src/libs/supabase";

export const Rogin: React.VFC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return (
    <>
      <div className="flex flex-row items-center h-screen bg-indigo-500 ">
        <div className="w-full bg-white flex p-10 flex-col ">
          <h1 className="text-4xl  py-16 text-center sm:text-4xl lg:text-6xl z-50  text-indigo-500">
            みんなでわりかん。
          </h1>
          <div className="mx-auto px-8  sm:max-w-screen-sm w-5/6 z-50">
            <Auth supabaseClient={client} providers={["google"]} />
          </div>
        </div>
      </div>
    </>
  );
};
