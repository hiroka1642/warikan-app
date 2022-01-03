import type { MouseEventHandler } from "react";

type Props = {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  children: any;
  color?: string;
  className?: string;
};

export const ButtonComponent: React.VFC<Props> = (props: Props) => {
  return (
    <button onClick={props.onClick} className={props.className}>
      {props.children}
    </button>
  );
};

export const ListButtonComponent: React.VFC<Props> = (props: Props) => {
  return (
    <button onClick={props.onClick} className={props.className}>
      {props.children}
    </button>
  );
};
