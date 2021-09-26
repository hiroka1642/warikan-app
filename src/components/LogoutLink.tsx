import { LinkOverlay } from "@chakra-ui/react";
import { client } from "src/libs/supabase";

type Props = {
  children: string;
  icon: any;
};

const handleLogout=()=>{
  client.auth.signOut()
}

export const LogoutComponent: React.VFC<Props> = (props) => {
  return (
    <LinkOverlay
      className="flex items-center gap-1"
      onClick={
        handleLogout
      }
    >
      <p>{props.children}</p>
      {props.icon}
    </LinkOverlay>
  );
};
