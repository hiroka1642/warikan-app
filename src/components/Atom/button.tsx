import type { MouseEventHandler } from "react";

type Props = {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  children: any;
  color?: string;
  className?: string;
};

export const ButtonComponent: React.VFC<Props> = (props: Props) => {
  return (
    <button
      type="submit"
      className="inline-flex font-bold justify-center py-3 px-4 border border-transparent text-sm  rounded text-white bg-indigo-500 hover:bg-indigo-700 transition-colors"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export const ListButtonComponent: React.VFC<Props> = (props: Props) => {
  return (
    <button
      className="py-2 px-4 w-full bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
