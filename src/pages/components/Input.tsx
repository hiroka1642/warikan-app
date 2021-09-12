import { Input } from "@chakra-ui/react";

export const InputComponent = (props) => {
  return (
    <Input
      isInvalid
      placeholder={props.children}
      focusBorderColor="green.400"
      errorBorderColor="green.200"
    />
  );
};
