import { Button, LinkOverlay } from "@chakra-ui/react";

type Props = {
  href?: string;
  onClick?: VoidFunction;
  children?: string;
};

export const ButtonComponent: React.VFC<Props> = (props: Props) => {
  return (
    <LinkOverlay href={props.href}>
      <Button colorScheme="teal" size="md" onClick={props.onClick}>
        {props.children}
      </Button>
    </LinkOverlay>
  );
};
