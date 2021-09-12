import { LinkOverlay } from "@chakra-ui/react";

export const LinkComponent = (props) => {
  return (
    <LinkOverlay className="flex items-center gap-1">
      {props.icon}
      <p>{props.children}</p>
    </LinkOverlay>
  );
};
