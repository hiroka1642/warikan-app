import { Auth } from "@supabase/ui";
import { client } from "src/libs/supabase";

export const Rogin: React.VFC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return (
    <>
      <div className="flex flex-row items-center h-screen">
        <div className=" sm:w-2/5 h-full invisible sm:visible"></div>
        <div className="w-full bg-indigo-600 flex flex-col sm:w-4/5 h-[130%] sm:rounded-l-full">
          <h1 className="text-4xl mt-64 py-20 text-center sm:text-4xl lg:text-6xl z-50  text-white">
            みんなでわりかん。
          </h1>
          <div className="mx-auto sm:max-w-screen-sm w-5/6 z-50">
            <Auth supabaseClient={client} providers={["google"]} />
          </div>
        </div>
      </div>
    </>
  );
};
