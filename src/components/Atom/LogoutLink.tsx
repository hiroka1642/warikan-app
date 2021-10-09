import { client } from "src/libs/supabase";

type Props = {
  children: string;
  icon: any;
};

const handleLogout = () => {
  client.auth.signOut();
};

export const LogoutComponent: React.VFC<Props> = (props) => {
  return (
    <div className="w-28">
      <button className="flex gap-1" onClick={handleLogout}>
        {props.children}
        {props.icon}
      </button>
    </div>
  );
};
