import type { MouseEventHandler } from "react";

type Props = {
  children: any;
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
};

export const LinkButton: React.VFC<Props> = (props) => {
  return (
    <button
      className="flex gap-1 p-7 items-center hover:bg-indigo-500 h-full whitespace-nowrap"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export const LinkButton2: React.VFC<Props> = (props) => {
  return (
    <button
      className="flex gap-1 p-7 items-center hover:bg-gray-200 h-full w-full"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
