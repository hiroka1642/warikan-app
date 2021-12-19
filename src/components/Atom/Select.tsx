import { Select } from "@chakra-ui/select";
import type { ChangeEventHandler } from "react";

type Props = {
  handleInputvalueChange: ChangeEventHandler<HTMLSelectElement> | undefined;
  value: number | undefined;
  placeholder: string;
  numberOfPeople: number;
};

export const SelectComponent = (props: Props) => {
  const minitues = [...Array(props.numberOfPeople)].map((_, i: number) => {
    return ++i;
  });

  return (
    <Select
      focusBorderColor="blue.300"
      borderColor="blue.200"
      backgroundColor="white"
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.handleInputvalueChange}
    >
      {minitues.map((number) => {
        return (
          <option value={number} key={number}>
            {number}
          </option>
        );
      })}
    </Select>
  );
};
