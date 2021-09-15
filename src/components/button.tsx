import { Button, LinkOverlay } from "@chakra-ui/react";

type Props = {
  href?: string;
  onClick?: VoidFunction;
  children?: string;
  color?: string;
};

export const ButtonComponent: React.VFC<Props> = (props: Props) => {
  return (
    <div>
      <Button
        colorScheme={props.color || "teal"}
        size="md"
        onClick={props.onClick}
      >
        <LinkOverlay href={props.href}>{props.children}</LinkOverlay>
      </Button>
    </div>
  );
};