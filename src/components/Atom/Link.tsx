import { LinkOverlay } from "@chakra-ui/react";

type Props = {
  icon: string;
  children: string;
};

export const LinkComponent: React.VFC<Props> = (props) => {
  return (
    <LinkOverlay className="flex items-center gap-1">
      {props.icon}
      <p>{props.children}</p>
    </LinkOverlay>
  );
};
