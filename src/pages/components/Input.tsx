import { Input } from "@chakra-ui/react";

type Props = {
  children: string;
};

export const InputComponent: React.VFC<Props> = (props) => {
  return (
    <Input
      isInvalid
      placeholder={props.children}
      focusBorderColor="green.400"
      errorBorderColor="green.200"
    />
  );
};
