import { memo } from "react";
import type { ChangeEventHandler } from "react";

type Props = {
  value: any;
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
  placeholder?: string;
  type?: string;
  className?: string;
};

// eslint-disable-next-line react/display-name
export const InputComponent: React.VFC<Props> = memo((props) => {
  return (
    <div className={`${props.className}`}>
      <input
        autoFocus
        type={props.type || "text"}
        className=" my-1 px-3 block ring-1 border-none outline-none focus:ring-indigo-500 ring-gray-300 text-gray-700 relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg cursor-default  sm:text-sm"
        onChange={props.onChange}
        value={props.value}
        placeholder={props.placeholder}
      />
    </div>
  );
});
