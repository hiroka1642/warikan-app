import { memo } from "react";
import type { Dispatch, SetStateAction } from "react";

type Props = {
  children: any;
  value: any;
  setInputvalue: Dispatch<SetStateAction<any>>;
};

// eslint-disable-next-line react/display-name
export const InputComponent: React.VFC<Props> = memo((props) => {
  const handleInputvalueChange = (e: any) => {
    props.setInputvalue(e.target.value);
  };

  return (
    <input
      value={props.value}
      placeholder={props.children}
      onChange={handleInputvalueChange}
    />
    // <Input
    //   placeholder={props.children}
    //   focusBorderColor="blue.300"
    //   borderColor="blue.200"
    //   errorBorderColor="red.200"
    //   backgroundColor="white"
    //   value={props.value}
    //   onChange={handleInputvalueChange}
    // />
  );
});
