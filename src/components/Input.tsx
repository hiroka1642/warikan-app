import { Input } from "@chakra-ui/react";

type Props = {
  children?: string;
  value?: any;
  onChange?: VoidFunction;
  setInputvalue?: any;
};

export const InputComponent: React.VFC<Props> = (props) => {
  const handleInputvalueChange = (e: any) => {
    props.setInputvalue(e.target.value);
  };

  return (
    <Input
      isInvalid
      placeholder={props.children}
      focusBorderColor="green.400"
      errorBorderColor="green.200"
      value={props.value}
      onChange={handleInputvalueChange}
    />
  );
};
