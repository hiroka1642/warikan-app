import type { ChangeEventHandler } from "react";

type Props = {
  handleInputvalueChange: ChangeEventHandler<HTMLSelectElement> | undefined;
  value: number | undefined;
  placeholder: string;
  numberOfPeople: number;
};

export const SelectComponent = (props: Props) => {
  const numbers = [...Array(props.numberOfPeople)].map((_, i: number) => {
    return ++i;
  });

  return (
    <select
      placeholder={props.placeholder}
      value={props.value}
      onBlur={props.handleInputvalueChange}
    >
      {numbers.map((number) => {
        return (
          <option value={number} key={number}>
            {number}
          </option>
        );
      })}
    </select>
  );
};
