import { LinkOverlay } from "@chakra-ui/react";

type Props = {
  children: string;
  icon: any;
};

export const LogoutComponent: React.VFC<Props> = (props) => {
  return (
    <LinkOverlay className="flex items-center gap-1">
      <p>{props.children}</p>
      {props.icon}
    </LinkOverlay>
  );
};
