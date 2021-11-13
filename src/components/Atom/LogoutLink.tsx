import { useRouter } from "next/dist/client/router";
import type { ReactElement } from "react";
import { client } from "src/libs/supabase";

type Props = {
  children: string;
  icon: ReactElement;
};

export const LogoutComponent: React.VFC<Props> = (props) => {
  const router = useRouter();
  const handleLogout = () => {
    client.auth.signOut();
    router.push("/");
  };

  return (
    <div className="w-28 ">
      <button className="flex gap-1 " onClick={handleLogout}>
        {props.children}
        {props.icon}
      </button>
    </div>
  );
};
