import type { MouseEventHandler } from "react";

type Props = {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  children: string;
  color?: string;
};

export const ButtonComponent: React.VFC<Props> = (props: Props) => {
  return <button onClick={props.onClick}>{props.children}</button>;
};

export const ListButtonComponent: React.VFC<Props> = (props: Props) => {
  return <button onClick={props.onClick}>{props.children}</button>;
};
