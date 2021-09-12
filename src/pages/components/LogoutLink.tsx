import { LinkOverlay } from "@chakra-ui/react";

export const LogoutComponent = (props) => {
  return (
    <LinkOverlay className="flex items-center gap-1">
      <p>{props.children}</p>
      {props.icon}
    </LinkOverlay>
  );
};
