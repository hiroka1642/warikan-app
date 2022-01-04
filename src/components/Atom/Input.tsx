import { memo } from "react";
import type { ChangeEventHandler } from "react";

type Props = {
  value: any;
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
  placeholder?: string;
};

// eslint-disable-next-line react/display-name
export const InputComponent: React.VFC<Props> = memo((props) => {
  return (
    <input
      type="text"
      className="  px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm"
      value={props.value}
      onChange={props.onChange}
      placeholder={props.placeholder}
    />
  );
});
