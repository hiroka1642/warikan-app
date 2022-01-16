import type { ChangeEventHandler } from "react";
import { InputComponent } from "../Atom/Input";

type Props = {
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
  name?: string;
  value: string | undefined;
  placeholder?: string;
};

export const InputWithLabel = (props: Props) => {
  return (
    <>
      <label className="text-sm text-gray-700 block mb-1 font-medium text-justify">
        {props.name}
        <InputComponent
          value={props.value}
          onChange={props.onChange}
          placeholder={props.placeholder}
        />
      </label>
    </>
  );
};
