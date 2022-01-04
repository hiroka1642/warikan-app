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
      className={`m-1 inline-flex font-bold justify-center py-3 px-4 border border-transparent text-sm  rounded text-white bg-indigo-500 hover:bg-indigo-700 transition-colors ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
export const GrayButtonComponent: React.VFC<Props> = (props: Props) => {
  return (
    <button
      type="submit"
      className={`m-1 inline-flex font-bold justify-center py-3 px-4 border border-transparent text-sm  rounded text-gray-800 border-indigo-300 hover:bg-gray-100 bg-white transition-colors ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export const ListButtonComponent: React.VFC<Props> = (props: Props) => {
  return (
    <button
      className={`py-2 px-4 w-full bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
