import { Button } from "@chakra-ui/react";
import type { MouseEventHandler } from "react";

type Props = {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  children: string;
  color?: string;
};

export const ButtonComponent: React.VFC<Props> = (props: Props) => {
  return (
    <Button
      colorScheme={props.color || "teal"}
      size="md"
      onClick={props.onClick}
      shadow="xl"
    >
      {props.children}
    </Button>
  );
};

export const ListButtonComponent: React.VFC<Props> = (props: Props) => {
  return (
    <Button color={props.color} onClick={props.onClick} padding="25px" width="full">
      {props.children}
    </Button>
  );
};
