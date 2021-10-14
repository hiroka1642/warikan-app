import { Input } from "@chakra-ui/react";
import type { Dispatch, SetStateAction } from "react";

type Props = {
  children: any;
  value: any;
  setInputvalue: Dispatch<SetStateAction<any>>;
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
