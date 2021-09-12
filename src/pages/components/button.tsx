import { Button, LinkOverlay } from "@chakra-ui/react";

export const ButtonComponent = (props) => {
  return (
    <LinkOverlay href={props.href}>
      <Button colorScheme="teal" size="md" onClick={props.onClick}>
        {props.children}
      </Button>
    </LinkOverlay>
  );
};
